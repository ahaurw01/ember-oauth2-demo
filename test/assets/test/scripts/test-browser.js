/*global mocha:false, $:false */

(function () {
  'use strict';

  mocha.setup({ui: 'bdd', globals:['XMLHttpRequest']});

  $().ready(function () {
    // Is the div to attach view DOM tests using `view.appendTo('#fixture')`.
    // Remember to view.destroy().
    $('<div id="fixture" style="display:none;"><div>').appendTo('body');
  });

}());
