'use strict';

module.exports = Ember.ArrayController.extend({
  needs: ['auth'],

  isNotLoggedIn: Ember.computed.not('controllers.auth.isLoggedIn')
});