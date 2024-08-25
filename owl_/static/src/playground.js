/** @odoo-module **/

import { Component, markup, useState } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { TodoList } from "./js/todo";

export class Playground extends Component {
    static template = "owl_.playground";
    static components = { Counter, TodoList};

    setup() {
        this.str1 = "<div class='text-primary'>some content</div>";
        this.str2 = markup("<div class='text-primary'>some content</div>");
        this.sum = useState({ value: 2 });
    }
}
