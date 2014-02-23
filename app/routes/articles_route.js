'use strict';

module.exports = Ember.Route.extend({
  model: function () {
    return $.getJSON('/api/articles');
  }
});