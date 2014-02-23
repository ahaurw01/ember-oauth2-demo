(function () {
  'use strict';

  /**
   * Load unit tests in brunch 1.7.
   */
  function load() {
    var r = /^test\/.*_test/;
    require.list().forEach(function (module) {
      if (r.test(module)) {
        require(module);
      }
    });
  }

  load();
}());
