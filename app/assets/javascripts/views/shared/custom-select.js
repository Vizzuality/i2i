$(document).on('ready, turbolinks:load', function() {
  $('.filter-select').select2({
    width: '100%',
    placeholder: 'Select...',
    allowClear: false
  });
});
