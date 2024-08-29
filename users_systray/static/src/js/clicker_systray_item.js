/** @odoo-module */
import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { onWillStart } from "@odoo/owl";

export class Clicker extends Component{

    static template = 'owl_.clicker_systray'
    setup(){
        this.user = useService("user");
        this.orm = useService("orm");
        this.action = useService("action");
        onWillStart(async () => {
            this.users = await this._fetchAllUser();
        });
        this.state = useState({'expandUsers': false})
    }

    _openUserModel = async (id) => {
        var action = await this.orm.call('res.users', 'get_action', [id, id])
        this.action.doAction(
            action
        )
            
    }

    async _fetchAllUser() {
        this.state.expandUsers = false;
        const data = await this.orm.webSearchRead("res.users", [], {
            specification: {
                name: {},
            },
        });
        const stageSeqAndNamePerId = {};
        return data.records
    }
}

registry.category("systray").add("owl_.Clicker", {
    Component: Clicker,
},{ sequence: 50 });