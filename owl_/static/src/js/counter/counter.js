/** @odoo-module */
import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "owl_.Counter";

    setup() {
        this.state = useState({ value: 0 });
    }

    increment() {
        this.state.value++;
    }
}