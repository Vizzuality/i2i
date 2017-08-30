class ErrorsController < ApplicationController
  def not_found
    render(status: 404, layout: false, template: "errors/not_found")
  end
end
