from odoo import api, fields, models

class ResUsers(models.Model):
    _inherit = 'res.users'

    def get_action(self, id):
        form_view = self.env.ref('base.view_users_form')
        return {
            'name': ("User"),
            'type': 'ir.actions.act_window',
            'res_model': 'res.users',
            'view_mode': 'form',
            'views': [(form_view.id, 'form')],
            'domain': [('id', 'in', [id])],
            "res_id": id,
        }