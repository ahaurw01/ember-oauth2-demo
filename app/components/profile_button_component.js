'use strict';

module.exports = Ember.Component.extend({
  actions: {
    googleSignIn: function () {
      this.sendAction('googleSignIn');
    },
    viewProfile: function () {
      this.sendAction('viewProfile');
    }
  }
});