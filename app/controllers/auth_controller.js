'use strict';

// Proxies a user profile object, keeps track of whether or not we are logged in.
module.exports = Ember.ObjectController.extend({
  isLoggedIn: function () {
    return !!this.get('content');
  }.property('content')
});