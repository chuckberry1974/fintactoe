var should = require('chai').should()
var expect = require('chai').expect
var supertest = require('supertest')
var api = supertest('https://fintactoe.herokuapp.com')

var OK = 200
var NOT_FOUND = 404
var UNAUTHORIZED = 401
var REDIRECT = 302

describe('Is the app working properly?', function () {
  it('should exist on the server', function (done) {
    api.get('/')
      .set('Accept', 'text/html')
      .expect(OK, done)
  })
  it('should no longer exist on the server', function (done) {
    api.get('/1')
      .set('Accept', 'text/html')
      .expect(NOT_FOUND, done)
  })
})

describe('dashboard should not be accessed without authorization', function () {
  it('should exist on the server', function (done) {
    api.get('/dashboard')
      .set('Accept', 'text/html')
      .expect(REDIRECT, done)
  })
})

describe('ocr should not be accessed without authorization', function () {
  it('should exist on the server', function (done) {
    api.get('/ocr')
      .set('Accept', 'text/html')
      .expect(REDIRECT, done)
  })
})

describe('Is the forgot working properly?', function () {
  it('should exist on the server', function (done) {
    api.get('/forgot')
      .set('Accept', 'text/html')
      .expect(OK, done)
  })
})

describe('Is the login working properly?', function () {
  it('should exist on the server', function (done) {
    api.get('/login')
      .set('Accept', 'text/html')
      .expect(OK, done)
  })
})

var token, user, headers, response, results;

var url = "https://fintactoe.herokuapp.com/dashboard"
var request = require('request')

describe('when non authorized', function () {
  beforeEach(function (done) {
      request.get({url: url, json: true}, function (err, resp, body) {
          response = resp;
          done(err);
      });
  });

  it ('should not be authorized', function () {
      expect(response.statusCode).to.equal(401);
  });
});
