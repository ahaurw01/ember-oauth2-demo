'use strict';

module.exports = Ember.Component.extend({
  click: function () {
    this.sendAction();
  }
});