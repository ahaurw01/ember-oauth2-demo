// Bootstrap the application.
module.exports = Em.Application.create({
  // LOG_TRANSITIONS: window.ENV && window.ENV.DEVELOPMENT,
  LOG_TRANSITIONS_INTERNAL: true,

  // Override the default resolver logic
  Resolver: require('resolver')
});
