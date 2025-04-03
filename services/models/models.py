from odoo import models, fields

class MyNewAppModel(models.Model):
    _name = 'my.new.app.model'
    _description = 'My New App Model'

    name = fields.Char(string='Name', required=True)
    description = fields.Text(string='Description')
    active = fields.Boolean(string='Active', default=True)
    float_test = fields.Float('Test Float')
    created_date = fields.Datetime(string='Created Date', default=fields.Datetime.now)