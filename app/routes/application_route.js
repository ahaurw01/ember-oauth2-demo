'use strict';

module.exports = Ember.Route.extend({
  beforeModel: function (transition) {
    // retrieve the user profile
    var authController = this.controllerFor('auth');
    $.getJSON('/api/profile').then(function (profile) {
      authController.set('content', profile);
    }, function (error) {
    }).then(function () {
      // See if we need to transition elsewhere after logging in.
      var previousPath = localStorage.previousPath;
      if (previousPath) {
        delete localStorage.previousPath;
        transition.abort();
        window.location.replace(previousPath);
      }
    });
  },

  actions: {
    googleSignIn: function () {
      if (!this.get('controller.isLoggedIn')) {
        // save the current path for use when we're logged in.
        localStorage.previousPath = window.location.hash;
        window.location.href = '/auth/google';
      } else {
        // log out!
        window.location.href = '/auth/logout';
      }
    }
  }
});