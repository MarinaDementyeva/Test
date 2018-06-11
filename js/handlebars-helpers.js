'use strict';

window.Handlebars.registerHelper(`AddOneTo`, function (value) {
  return ++value;
});
