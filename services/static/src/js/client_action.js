/** @odoo-module **/

import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";
import { Component, useSubEnv } from "@odoo/owl";
import { getDefaultConfig } from "@web/views/view";
import { Layout } from "@web/search/layout";
import { ErrorDialog } from "@web/core/errors/error_dialogs";
import { ClientErrorDialog } from "@web/core/errors/error_dialogs";
import { AlertDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

export class ServiceComponent extends Component {
    static template = 'services.services'
    
    setup(){
        super.setup();
    }

    get services(){
        return this.env.services.basicServices
    }
}


class ClientAction extends Component {
    static template = 'services.my_new_app_client_action';
    static components = { Layout, ServiceComponent };

    setup() {
        this.display = {
            controlPanel: {
                'top-right': false,
                'button-rigth': false
            }
        }
        super.setup();
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            }
        })
    }

    showNoti(){
        this.env.services.notification.add('test', {
            title: _t('Hello world!'),
            message: _t('This is a notification'),
            type: 'info',
        });
    }

    showDialog(){
        this.env.services.dialog.add(AlertDialog, {
            title: "Test Dialog",
            body: "This is a test dialog",
        })
    }
}

registry.category("actions").add('services.my_new_app_client_action', ClientAction);
