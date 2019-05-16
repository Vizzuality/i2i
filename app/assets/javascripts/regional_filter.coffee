$(document).on 'turbolinks:load', ->
  if $('.l-data-portal, .l-national-surveys').length
    $('.l-data-portal, .l-national-surveys').on 'change', 'input', (e) ->
      $('.countries-list').hide()
      $(".countries-list.#{e.currentTarget.value}").show()
