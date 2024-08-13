/** @odoo-module **/

import { kanbanView } from "@web/views/kanban/kanban_view";
import { KanbanController } from "@web/views/kanban/kanban_controller";
import { registry } from "@web/core/registry";


export class CustomKanbanController extends KanbanController {

}

export const CustomKanban = {
    ...kanbanView,
    Controller: CustomKanbanController,
};

registry.category("views").add("kanban_filter", CustomKanban);