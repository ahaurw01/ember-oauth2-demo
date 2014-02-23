'use strict';

module.exports = Ember.Route.extend({
  model: function (params) {
    return $.getJSON('/api/articles/' + params.slug);
  },

  serialize: function (model) {
    return {slug: model.slug};
  }
});