# -*- coding: utf-8 -*-
# from odoo import http


# class FieldHighlight(http.Controller):
#     @http.route('/field_highlight/field_highlight', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/field_highlight/field_highlight/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('field_highlight.listing', {
#             'root': '/field_highlight/field_highlight',
#             'objects': http.request.env['field_highlight.field_highlight'].search([]),
#         })

#     @http.route('/field_highlight/field_highlight/objects/<model("field_highlight.field_highlight"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('field_highlight.object', {
#             'object': obj
#         })

