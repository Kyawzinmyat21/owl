/** @odoo-module **/

import { registry } from "@web/core/registry";
import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";
import { Many2XAutocomplete } from "@web/views/fields/relational_utils";

patch(Many2XAutocomplete.prototype, {
    mapRecordToOption(result) {
        return {
            value: result[0],
            label: result[1] ? result[1].split("\n")[0] : _t("Unnamed"),
            displayName: result[1],
            analytic_account: this.props.analytic ? result[2] : '',
        };
    },

    search(name) {
        if (this.props.analytic &&  this.props.resModel === "res.partner") {
            return this.orm.call(this.props.resModel, "name_search_analytic", [], {
                name: name,
                operator: "ilike",
                args: this.props.getDomain(),
                limit: this.props.searchLimit + 1,
                context: this.props.context,
            });
        }
        return this.orm.call(this.props.resModel, "name_search", [], {
            name: name,
            operator: "ilike",
            args: this.props.getDomain(),
            limit: this.props.searchLimit + 1,
            context: this.props.context,
        });
    }
})

Many2XAutocomplete.props = {
    ...Many2XAutocomplete.props,
    analytic: {type: Boolean, optional: true},
}

Many2XAutocomplete.defaultProps = {
    ...Many2XAutocomplete.defaultProps,
    analytic: false
}