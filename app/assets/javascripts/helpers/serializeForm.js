((function (App) {
  'use strict';

  App.Helper.SerializeForm = function (form) {
    var obj = {};
    var elements = form.querySelectorAll('input, select, textarea');

    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var name = element.name;
      var value = element.value;

      if (element.type === 'checkbox') {
        if (element.checked) {
          if (!obj.hasOwnProperty(name)) {
            obj[name] = [value];
          } else {
            obj[name].push(value);
          }
        }
      } else {
        if (name) {
          obj[name] = value;
        }
      }
    }

    return obj;
  };
})(this.App));
