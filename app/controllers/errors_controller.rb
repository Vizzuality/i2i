class ErrorsController < ApplicationController
  def not_found
    render(status: 404, layout: false)
  end
end
