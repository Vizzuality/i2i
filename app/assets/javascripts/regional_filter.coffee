$(document).on 'turbolinks:load', ->
  if $('.l-data-portal').length
    $('.l-data-portal').on 'change', 'input', (e) ->
      $('.countries-list').hide()
      $(".countries-list.#{e.currentTarget.value}").show()
