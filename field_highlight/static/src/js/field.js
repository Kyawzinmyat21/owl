/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { Field } from "@web/views/fields/field";
import { registry } from "@web/core/registry";
import { archParseBoolean, getClassNameFromDecoration, X2M_TYPES } from "@web/views/utils";
import {getFieldFromRegistry} from "@web/views/fields/field";
import { evaluateExpr, evaluateBooleanExpr } from "@web/core/py_js/py";
import { utils } from "@web/core/ui/ui_service";



const viewRegistry = registry.category("views");
const isSmall = utils.isSmall;


patch(Field.prototype, {
    get classNames() {
            let classNames = super.classNames;
            let highlight = evaluateBooleanExpr(this.props.fieldInfo.highlight, this.props.record.evalContextWithVirtualIds);
            classNames.field_highlight = highlight
            return classNames
        }
})

Field.props = [
    ...Field.props,
   'highlight?'
]



Field.parseFieldNode = function (node, models, modelName, viewType, jsClass) {
    const name = node.getAttribute("name");
    const widget = node.getAttribute("widget");
    const highlight = node.getAttribute("highlight");
    const fields = models[modelName];
    if (!fields[name]) {
        throw new Error(`"${modelName}"."${name}" field is undefined.`);
    }
    const field = getFieldFromRegistry(fields[name].type, widget, viewType, jsClass);
    const fieldInfo = {
        name,
        type: fields[name].type,
        viewType,
        widget,
        field,
        context: "{}",
        string: fields[name].string,
        help: undefined,
        onChange: false,
        forceSave: false,
        options: {},
        decorations: {},
        attrs: {},
        domain: undefined,
        highlight,
    };
    fieldInfo[highlight] = highlight;
    for (const attr of ["invisible", "column_invisible", "readonly", "required"]) {
        fieldInfo[attr] = node.getAttribute(attr);
        if (fieldInfo[attr] === "True") {
            if (attr === "column_invisible") {
                fieldInfo.invisible = "True";
            }
        } else if (fieldInfo[attr] === null && fields[name][attr]) {
            fieldInfo[attr] = "True";
        }
    }

    for (const { name, value } of node.attributes) {
        if (["name", "widget"].includes(name)) {
            // avoid adding name and widget to attrs
            continue;
        }
        if (["context", "string", "help", "domain"].includes(name)) {
            fieldInfo[name] = value;
        } else if (name === "on_change") {
            fieldInfo.onChange = archParseBoolean(value);
        } else if (name === "options") {
            fieldInfo.options = evaluateExpr(value);
        } else if (name === "force_save") {
            fieldInfo.forceSave = archParseBoolean(value);
        } else if (name.startsWith("decoration-")) {
            // prepare field decorations
            fieldInfo.decorations[name.replace("decoration-", "")] = value;
        } else if (!name.startsWith("t-att")) {
            // all other (non dynamic) attributes
            fieldInfo.attrs[name] = value;
        }
    }
    if (name === "id") {
        fieldInfo.readonly = "True";
    }

    if (widget === "handle") {
        fieldInfo.isHandle = true;
    }

    if (X2M_TYPES.includes(fields[name].type)) {
        const views = {};
        let relatedFields = fieldInfo.field.relatedFields;
        if (relatedFields) {
            if (relatedFields instanceof Function) {
                relatedFields = relatedFields(fieldInfo);
            }
            for (const relatedField of relatedFields) {
                if (!("readonly" in relatedField)) {
                    relatedField.readonly = true;
                }
            }
            relatedFields = Object.fromEntries(relatedFields.map((f) => [f.name, f]));
            views.default = { fieldNodes: relatedFields, fields: relatedFields };
            if (!fieldInfo.field.useSubView) {
                fieldInfo.viewMode = "default";
            }
        }
        for (const child of node.children) {
            const viewType = child.tagName === "tree" ? "list" : child.tagName;
            const { ArchParser } = viewRegistry.get(viewType);
            // We copy and hence isolate the subview from the main view's tree
            // This way, the subview's tree is autonomous and CSS selectors will work normally
            const childCopy = child.cloneNode(true);
            const archInfo = new ArchParser().parse(childCopy, models, fields[name].relation);
            views[viewType] = {
                ...archInfo,
                limit: archInfo.limit || 40,
                fields: models[fields[name].relation],
            };
        }

        let viewMode = node.getAttribute("mode");
        if (viewMode) {
            if (viewMode.split(",").length !== 1) {
                viewMode = isSmall() ? "kanban" : "list";
            } else {
                viewMode = viewMode === "tree" ? "list" : viewMode;
            }
        } else {
            if (views.list && !views.kanban) {
                viewMode = "list";
            } else if (!views.list && views.kanban) {
                viewMode = "kanban";
            } else if (views.list && views.kanban) {
                viewMode = isSmall() ? "kanban" : "list";
            }
        }
        if (viewMode) {
            fieldInfo.viewMode = viewMode;
        }
        if (Object.keys(views).length) {
            fieldInfo.relatedFields = models[fields[name].relation];
            fieldInfo.views = views;
        }
    }

    return fieldInfo;
};