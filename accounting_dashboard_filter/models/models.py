# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class accounting_dashboard_filter(models.Model):
#     _name = 'accounting_dashboard_filter.accounting_dashboard_filter'
#     _description = 'accounting_dashboard_filter.accounting_dashboard_filter'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100

