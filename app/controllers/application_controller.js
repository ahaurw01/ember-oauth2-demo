'use strict';

module.exports = Ember.Controller.extend({
  needs: ['auth'],
  isLoggedIn: Ember.computed.oneWay('controllers.auth.isLoggedIn')
});