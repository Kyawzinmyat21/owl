# -*- coding: utf-8 -*-
# from odoo import http


# class AccountingDashboardFilter(http.Controller):
#     @http.route('/accounting_dashboard_filter/accounting_dashboard_filter', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/accounting_dashboard_filter/accounting_dashboard_filter/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('accounting_dashboard_filter.listing', {
#             'root': '/accounting_dashboard_filter/accounting_dashboard_filter',
#             'objects': http.request.env['accounting_dashboard_filter.accounting_dashboard_filter'].search([]),
#         })

#     @http.route('/accounting_dashboard_filter/accounting_dashboard_filter/objects/<model("accounting_dashboard_filter.accounting_dashboard_filter"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('accounting_dashboard_filter.object', {
#             'object': obj
#         })

