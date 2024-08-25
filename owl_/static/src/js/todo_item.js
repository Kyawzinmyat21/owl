/** @odoo-module */
import { Component, useState } from "@odoo/owl";
export class TodoItem extends Component{

    static props = {
        todo: {type: Object,
        shape: {id:Number, des:String, isCompleted:Boolean}},
        changeCompleted: {type:Function}
    }

    static template = 'owl_.todo_item'
    setup(){

    }

    markCompleted = () => {
        this.props.todo.isCompleted = true;
    }
}