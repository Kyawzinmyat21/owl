/** @odoo-module */
import { Component, useState } from "@odoo/owl";
import { TodoItem } from "./todo_item";

export class TodoList extends Component{
    
    static components = {TodoItem}

    static template = 'owl_.to_do_list'
    setup(){
        this.todo = useState([{ id: 1, des: "buy milk", isCompleted: false }])
        this.newTodo = useState({'current': ''})
    }

    updateNewTodo = (e, newTodo) => {
        this.newTodo.current = e.target.value
    }

    updateCompleted = (id) => {
        this.todo = this.todo.map(item => {
            if (item.id == id) return  {...item, isCompleted:true}
            return {...item}
        })
    }

    updateTodo = () => {
        this.todo.push(
            {
                des: this.newTodo.current,
                id: this.todo.length + 1,
                isCompleted: false
            }
        )
    }
}