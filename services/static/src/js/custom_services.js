/** @odoo-module **/
import { registry } from "@web/core/registry";


const myService = {
    dependencies: ["notification"],
    start(env, { notification }) {
        let counter = 1;
        // setInterval(() => {
        //     notification.add(`Tick Tock ${counter++}`);
        // }, 1);
    }
};

registry.category("services").add("myService", myService);

export const services = {
    start(){
        return {
            string: 'test',
            'function': () => {
                return 'function called'
            },
            html: ''
        }
    }
}

registry.category("services").add('basicServices', services);