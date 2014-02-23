'use strict';

module.exports = Ember.Route.extend({
  beforeModel: function (transition) {
    function checkForRedirect() {
      // See if we need to transition elsewhere after logging in.
      var previousPath = localStorage.previousPath;
      if (previousPath) {
        delete localStorage.previousPath;
        transition.abort();
        window.location.replace(previousPath);
      }
    }

    // retrieve the user profile
    var authController = this.controllerFor('auth');
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.RSVP.Promise.cast($.getJSON('/api/profile'))
          .then(function (profile) {
            authController.set('content', profile);
          })
          .finally(function () {
            checkForRedirect();
            resolve();
          });
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
    },

    viewProfile: function () {
      this.transitionTo('profile');
    }
  }
});