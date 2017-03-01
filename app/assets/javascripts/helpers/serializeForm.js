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
            obj[name] = [{
              name: value
            }];
          } else {
            obj[name].push({
              name: value
            });
          }
        }
      } else {
        if (name) {
          obj[name] = value;
        }
      }
    }

    if (element.type === 'radio') {
      if (element.classList.contains('js-filter')) {
        if (obj[name] !== unefined && !obj[name].hasOwnProperty('options')) {
          obj[name].push(_.extend(obj[name]), {
            options: [value]
          });
        } else {
          //  WIP
          var options = obj[name];
          obj[name].push(_.extend(obj[name]), {
            options: [value]
          });
        }
      }
    }

    console.log(obj);

    return obj;
  };
})(this.App));
