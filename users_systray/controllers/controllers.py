# -*- coding: utf-8 -*-
# from odoo import http


# class UsersSystray(http.Controller):
#     @http.route('/users_systray/users_systray', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/users_systray/users_systray/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('users_systray.listing', {
#             'root': '/users_systray/users_systray',
#             'objects': http.request.env['users_systray.users_systray'].search([]),
#         })

#     @http.route('/users_systray/users_systray/objects/<model("users_systray.users_systray"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('users_systray.object', {
#             'object': obj
#         })

