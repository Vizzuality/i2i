$(document).on('ready', function() {
  $('.filter-select').select2({
    width: '100%'
  });
  document.addEventListener('turbolinks:load', function() {
    $('.filter-select').select2({
      width: '100%'
    });
  });
});
