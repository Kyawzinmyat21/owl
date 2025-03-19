/** @odoo-module **/

import { registry } from "@web/core/registry";
import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";
import { Many2OneField } from "@web/views/fields/many2one/many2one_field";
import { AutoComplete } from "@web/core/autocomplete/autocomplete";


AutoComplete.props = {
    ...AutoComplete.props,
    analytic: {type: Boolean, optional: true},
}

AutoComplete.defaultProps = {
    ...AutoComplete.defaultProps,
    analytic: false
}


class PartnerAnalytic extends Many2OneField {
    setup() {
        super.setup();
    }

    get Many2XAutocompleteProps() {
        return {
            ...super.Many2XAutocompleteProps,
            analytic: true,
        };
    }
}

export const PartnerAnalyticWidget = {
    ...Many2OneField,
    component: PartnerAnalytic
}

registry.category("fields").add('partner_analytic', PartnerAnalyticWidget);
