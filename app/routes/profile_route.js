'use strict';

module.exports = Ember.Route.extend({
  beforeModel: function (transition) {
    // Make sure we have the profile loaded. If not, we'll have to log in, then pick up where we left off
    if (!this.controllerFor('auth').get('isLoggedIn')) {
      transition.abort();
      localStorage.previousPath = '#/profile';
      window.location.href = '/auth/google';
    }
  },

  model: function () {
    return this.controllerFor('auth').get('model');
  }
});