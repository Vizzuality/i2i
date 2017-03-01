(function (App) {
  'use strict';

  App.Helper.SerializeFilters = function (form) {
    var filters = [],
      elements = form.querySelectorAll('input, select, textarea'),
      element,
      name,
      value;

    if (elements.length === 0) return null;

    for(var i = 0; i < elements.length; i += 1) {
      element = elements[i];
      name = element.name;
      value = element.value;

      if (element.type === 'checkbox') {
        if (element.checked) {
          var entry = _.findWhere(filters, { name: name });

          if (entry === undefined) {
            entry = {
              name: name,
              options: [value]
            };
            filters.push(entry);
          } else {
            entry.options.push(value);
          }
        }
      }
    }

    return filters;
  };
})(this.App);
