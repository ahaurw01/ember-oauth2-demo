'use strict';

module.exports = Ember.Route.extend({
  beforeModel: function () {
    this.replaceWith('articles');
  }
});