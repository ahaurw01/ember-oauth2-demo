'use strict';

module.exports = Ember.Controller.extend({
  needs: ['auth'],

  isLoggedIn: Ember.computed.oneWay('controllers.auth.isLoggedIn'),

  name: function () {
    if (this.get('isLoggedIn')) {
      return this.get('controllers.auth.name.givenName');
    } else {
      return 'Guest';
    }
  }.property('isLoggedIn')
});