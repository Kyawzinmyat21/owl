/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { useInputField } from "@web/views/fields/input_field_hook";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { FloatField } from '@web/views/fields/float/float_field';
import { formatFloat } from "@web/core/utils/numbers";
import { evaluateExpr } from "@web/core/py_js/py";


export class PyExpressionFloat extends FloatField {
    static template = "web.FloatTimeField";
    static props = {
        ...standardFieldProps,
        ...FloatField.props,
        expr: { type: String, optional: true }
    };
    setup() {
        super.setup()
    }

    get formattedValue() {

        if (
            !this.props.formatNumber ||
            (this.props.inputType === "number" && !this.props.readonly && this.value)
        ) {
            return evaluateExpr(this.props.expr, { this: this.value });
        }
        if (this.props.humanReadable && !this.state.hasFocus) {
            let res = formatFloat(this.value, {
                digits: this.digits,
                humanReadable: true,
                decimals: this.props.decimals,
            });
            return evaluateExpr(this.props.expr, { this: res });
        } else {
            let res = formatFloat(this.value, { digits: this.digits, humanReadable: false });
            return evaluateExpr(this.props.expr, { this: res });
        }
    }
}

export const PyExpressionFloatWidget = {
    component: PyExpressionFloat,
    displayName: _t("Py Expression"),
    isEmpty: () => false,
    extractProps: ({ attrs, options }) => ({
        expr: attrs.expr,
    }),
};

registry.category("fields").add("py_expression", PyExpressionFloatWidget);
