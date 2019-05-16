import app
import pytest

def test_successful_create_wishlist():
    response = app.create_wishlist({"id": "xtest1234"})
    assert response != None
    assert isinstance(response, tuple)
    assert response == (None, 201)

def test_failed_create_wishlist():
    response = app.create_wishlist({"id": "xtest1234"})
    assert response != None
    assert isinstance(response, tuple)
    assert response == ({'code': '400', 'message' : 'This wishlist already exists'}, 400)

def test_successful_delete_wishlist():
    app.create_wishlist({"id": "xtest1234"})
    response = app.delete_wishlist("xtest1234")
    assert response != None
    assert isinstance(response, tuple)
    assert response == (None, 204)

def test_failed_delete_wishlist():
    response = app.delete_wishlist("xtest23423423")
    assert response != None
    assert isinstance(response, tuple)
    assert response == ({'code': '404', 'message' : "This wishlist don't exists"}, 404)

def test_successful_add_product_wishlist():
    product = { "id" : "23", 
                "name" : "stan", 
                "price" : "100€", 
                "rating": "4",
                "image": "http://exemple.com/stan.png"}
    app.create_wishlist({"id": "xtest1234"})
    response = app.add_product_wishlist("xtest1234", product)
    assert response != None
    assert isinstance(response, tuple)
    assert response == (None, 201)

def test_failed_add_product_wishlist():
    product = { "id" : "23", 
                "name" : "stan", 
                "price" : "100€", 
                "rating": "4",
                "image": "http://exemple.com/stan.png"}
    app.create_wishlist({"id": "xtest1234"})
    response = app.add_product_wishlist("xtest1234", product)
    response = app.add_product_wishlist("xtest1234", product)
    assert response != None
    assert isinstance(response, tuple)
    assert response == ({'code': '400', 'message': 'product already exists in this wishlist'}, 400)

def test_is_product_exists_in_wishlist():
    product = { "id" : "23",
                "name" : "stan",
                "price" : "100€",
                "rating": "4",
                "image": "http://exemple.com/stan.png"}
    app.create_wishlist({"id": "xtest1234"})
    app.add_product_wishlist("xtest1234", product)
    found, found_index = app.is_product_exists_in_wishlist("xtest1234", "23")
    assert found == True
    assert found_index == 0

def test_successful_delete_product_wishlist():
    product = { "id" : "23",
                "name" : "stan",
                "price" : "100€",
                "rating": "4",
                "image": "http://exemple.com/stan.png"}
    app.create_wishlist({"id": "xtest1234"})
    app.add_product_wishlist("xtest1234", product)
    app.delete_product_wishlist("xtest1234", "23")
    found, found_index = app.is_product_exists_in_wishlist("xtest1234", "23")
    assert found == False
    assert found_index == None

