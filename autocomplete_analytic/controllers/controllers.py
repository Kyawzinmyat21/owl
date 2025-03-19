# -*- coding: utf-8 -*-
# from odoo import http


# class AutocompleteAnalytic(http.Controller):
#     @http.route('/autocomplete_analytic/autocomplete_analytic', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/autocomplete_analytic/autocomplete_analytic/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('autocomplete_analytic.listing', {
#             'root': '/autocomplete_analytic/autocomplete_analytic',
#             'objects': http.request.env['autocomplete_analytic.autocomplete_analytic'].search([]),
#         })

#     @http.route('/autocomplete_analytic/autocomplete_analytic/objects/<model("autocomplete_analytic.autocomplete_analytic"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('autocomplete_analytic.object', {
#             'object': obj
#         })

