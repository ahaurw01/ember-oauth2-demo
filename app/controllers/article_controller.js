'use strict';

module.exports = Ember.ObjectController.extend({
  needs: ['auth'],

  isNotLoggedIn: Ember.computed.not('controllers.auth.isLoggedIn')
});