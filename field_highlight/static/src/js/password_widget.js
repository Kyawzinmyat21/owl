/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { useInputField } from "@web/views/fields/input_field_hook";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { CharField } from "@web/views/fields/char/char_field";
import { formatChar } from "@web/views/fields/formatters";
import { useDynamicPlaceholder } from "@web/views/fields/dynamic_placeholder_hook";
import { useRef, onWillStart, useState } from "@odoo/owl";

export class PasswordDebugWidget extends CharField {
    static template = "field_highight.PasswordWidget";
    static props = {
        ...standardFieldProps,
        ...CharField.props,
        group: { type: String, optional: true }
    };
    static defaultProps = {
        ...CharField.defaultProps,
        group: 'base.group_no_one',
        readonly: true
    }

    setup() {
        this.state = useState({
            showPassword: false,
        });
       this.input = useRef("input");
               if (this.props.dynamicPlaceholder) {
                   const dynamicPlaceholder = useDynamicPlaceholder(this.input);
                   useExternalListener(document, "keydown", dynamicPlaceholder.onKeydown);
                   useEffect(() =>
                       dynamicPlaceholder.updateModel(this.props.dynamicPlaceholderModelReferenceField)
                   );
               }
        useInputField({
                    getValue: () => this.formattedValue,
                    parse: (v) => this.parse(v),
                });
        onWillStart(async () => {
            this.state.showPassword = this.props.group ? await this.env.services.user.hasGroup(this.props.group): false;

        });
    }

    get formattedValue() {
        return this.state.showPassword ? formatChar(this.props.record.data[this.props.name], {
                    isPassword: this.props.isPassword,
                }) : '********';
    }
}

export const _PasswordDebugWidget = {
    component: PasswordDebugWidget,
    displayName: _t("Password Debug Widget"),
    isEmpty: () => false,
    extractProps: ({ attrs, options }) => ({
        group: attrs.group,
    }),
};

registry.category("fields").add("password_debug_widget", _PasswordDebugWidget);
