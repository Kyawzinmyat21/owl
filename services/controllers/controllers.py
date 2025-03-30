# -*- coding: utf-8 -*-
# from odoo import http


# class Services(http.Controller):
#     @http.route('/services/services', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/services/services/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('services.listing', {
#             'root': '/services/services',
#             'objects': http.request.env['services.services'].search([]),
#         })

#     @http.route('/services/services/objects/<model("services.services"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('services.object', {
#             'object': obj
#         })

