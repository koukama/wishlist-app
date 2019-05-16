#!/usr/bin/env python3
""" This module demonstrates the implementation of the API using connexion framework.
    each python function is mapped to a swagger path operationId.
    connexion framework  handle json serialisation.
    To know more about this framework: https://connexion.readthedocs.io/en/latest/quickstart.html
"""

import logging

import connexion
from flask_cors import CORS



WISHLIST = [] # ['123', '432423', '43434']
WISHLIST_DATA = {} #
""" module level variables
"""


def create_wishlist(wishlist):
    """ POST /wishlist implementation

        Args:
           wishlist(dict): Wishlist informations

        Returns:
            tuple: reponse data and http code
    """
    if wishlist.get('id') is not None and wishlist.get('id') in WISHLIST:
        return {'code': '400', 'message' : 'This wishlist already exists'}, 400

    WISHLIST.append(wishlist.get('id'))
    WISHLIST_DATA[wishlist.get('id')] = []
    return None, 201

def get_wishlist(wishlist_id, page=0, limit=50):
    """ GET /wishlist/{id} implementation

        Args:
           wishlist_id(string): Wishlist ID
           page(int): page number for pagination
           limit(int): how much items

        Returns:
            tuple: reponse data and http code
    """
    if wishlist_id not in WISHLIST:
        return {'code': '404', 'message' : "This wishlist don't exists"}, 404
    return WISHLIST_DATA[wishlist_id], 200

def delete_wishlist(wishlist_id):
    """ DELETE /wishlist/{id} implementation

        Args:
           wishlist_id(string): Wishlist ID

        Returns:
            tuple: reponse data and http code
    """
    if wishlist_id not in WISHLIST:
        return {'code': '404', 'message' : "This wishlist don't exists"}, 404
    if wishlist_id in WISHLIST_DATA:
        del WISHLIST_DATA[wishlist_id]
    WISHLIST.remove(wishlist_id)
    return None, 204



def add_product_wishlist(wishlist_id, product):
    """ POST /wishlist/{id}/poducts implementation

        Args:
           product(dict): product informations

        Returns:
            tuple: reponse data and http code
    """
    found, _ = is_product_exists_in_wishlist(wishlist_id, product.get("id"))
    if found:
        return {'code': '400', 'message': 'product already exists in this wishlist'}, 400
    WISHLIST_DATA[wishlist_id].append(product)
    return None, 201

def delete_product_wishlist(wishlist_id, product_id):
    """ DELETE /wishlist/{id}/poducts/{id} implementation

        Args:
           product(dict): product informations

        Returns:
            tuple: reponse data and http code
    """
    found, found_index = is_product_exists_in_wishlist(wishlist_id, product_id)
    if found == False:
        return {'code': '400', 'message': 'this product doesn\'t exist'}, 400
    del WISHLIST_DATA[wishlist_id][found_index]
    return None, 204

def is_product_exists_in_wishlist(wishlist_id, product_id):
    found = False
    found_index = None
    i = 0
    for p in WISHLIST_DATA[wishlist_id]:
        if p["id"] ==  product_id:
            found = True
            found_index = i
            i = i + 1
    return (found, found_index)


logging.basicConfig(level=logging.INFO)
app = connexion.App(__name__)
app.add_api('swagger.yaml')
application = app.app
CORS(app.app)

if __name__ == '__main__':
    app.run(port=8085, debug=True)
