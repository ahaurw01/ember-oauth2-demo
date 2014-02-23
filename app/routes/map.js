'use strict';

var App = require('app');

App.Router.map(function () {
  this.resource('articles');
  this.resource('article', {path: '/articles/:slug'});
});
