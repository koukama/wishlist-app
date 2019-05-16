import app
import pytest
import requests

API_URL = 'http://api-test:8085'

def test_api_create_wishlist_success():
    response = requests.post(API_URL + '/wishlist', json={'id': 'integ-test-123'})
    assert response != None
    assert response.ok == True
    assert response.status_code == 201

def test_api_create_wishlist_should_fail():
    response = requests.post(API_URL + '/wishlist', json={'id': 'integ-test-123'})
    assert response != None
    assert response.ok == False
    assert response.status_code == 400

def test_api_delete_wishlist_success():
    response = requests.post(API_URL + '/wishlist', json={'id': 'integ-test-123'})
    response = requests.delete(API_URL + '/wishlist/integ-test-123')
    print (response.text)
    assert response != None
    assert response.ok == True
    assert response.status_code == 204

def test_api_delete_wishlist_should_fail():
    response = requests.delete(API_URL + '/wishlist/integ-test-123424324')
    assert response != None
    assert response.ok == False
    assert response.status_code == 404

def test_api_add_product_wishlist_success():
    response = requests.post(API_URL + '/wishlist', json={'id': 'integ-test-123'})
    response = requests.post(API_URL + '/wishlist/integ-test-123/products', json={"id" : "23", 
                                                                                       "name" : "stan", 
                                                                                       "price" : 100, 
                                                                                       "rating": 4.1,
                                                                                       "image": "http://exemple.com/stan.png"})
    assert response !=  None
    assert response.ok == True
    assert response.status_code == 201

def test_api_add_product_wishlist_should_fail():
    response = requests.post(API_URL + '/wishlist', json={'id': 'integ-test-123'})
    response = requests.post(API_URL + '/wishlist/integ-test-123/products', json={"id" : "23", 
                                                                                       "name" : "stan", 
                                                                                       "price" : 100, 
                                                                                       "rating": 4.1,
                                                                                       "image": "http://exemple.com/stan.png"})
    response = requests.post(API_URL + '/wishlist/integ-test-123/products', json={"id" : "23", 
                                                                                       "name" : "stan", 
                                                                                       "price" : 100, 
                                                                                       "rating": 4.1,
                                                                                       "image": "http://exemple.com/stan.png"})
    assert response !=  None
    assert response.ok == False
    assert response.status_code == 400