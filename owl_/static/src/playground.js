/** @odoo-module **/

import { Component, markup, useState, useRef } from "@odoo/owl";
import { Counter } from "./counter/counter";

export class Playground extends Component {
    static template = "owl_.playground";
    static components = { Counter};

    setup() {
        this.str1 = "<div class='text-primary'>some content</div>";
        this.str2 = markup("<div class='text-primary'>some content</div>");
        this.sum = useState({ value: 2 });
        this.ref = useRef("test");
        console.log(this.ref.el);
    }

    test(){
        alert('cik')
    }

    increment() {
        this.ref.el.click()
    }
}
