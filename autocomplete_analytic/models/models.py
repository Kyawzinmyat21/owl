from odoo import models, fields, api
from odoo.tools import Query

class autocomplete_analytic(models.Model):
    _inherit = 'res.partner'

    @api.model
    def name_search_analytic(self, name='', args=None, operator='ilike', limit=100):
        """ name_search(name='', args=None, operator='ilike', limit=100) -> records

        Search for records that have a display name matching the given
        ``name`` pattern when compared with the given ``operator``, while also
        matching the optional search domain (``args``).

        This is used for example to provide suggestions based on a partial
        value for a relational field. Should usually behave as the reverse of
        ``display_name``, but that is not guaranteed.

        This method is equivalent to calling :meth:`~.search` with a search
        domain based on ``display_name`` and mapping id and display_name on
        the resulting search.

        :param str name: the name pattern to match
        :param list args: optional search domain (see :meth:`~.search` for
                          syntax), specifying further restrictions
        :param str operator: domain operator for matching ``name``, such as
                             ``'like'`` or ``'='``.
        :param int limit: optional max number of records to return
        :rtype: list
        :return: list of pairs ``(id, display_name)`` for all matching records.
        """
        ids = self._name_search(name, args, operator, limit=limit, order=self._order)

        if isinstance(ids, Query):
            records = self._fetch_query(ids, self._determine_fields_to_fetch(['display_name']))
        else:
            # Some override of `_name_search` return list of ids.
            records = self.browse(ids)
            records.fetch(['display_name'])

        return [(record.id, record.display_name + '123', '123') for record in records.sudo()]
