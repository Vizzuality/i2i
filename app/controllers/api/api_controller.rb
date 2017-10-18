module Api
  class ApiController < ActionController::Base
    def require_login
      authenticate_token || render_unauthorized("Access denied")
    end

    def current_user
      @current_user ||= authenticate_token
    end

    def meta(records)
      {
        # current_page: records.current_page,
        # total_pages: records.total_pages,
        # total_count: records.total_count,
        page_total: records.count
      }
    end

    protected

    def render_unauthorized(message)
      errors = { errors: [ { detail: message } ] }
      render json: errors, status: :unauthorized
    end

    private

    def authenticate_token
      authenticate_with_http_token do |token, options|
        User.find_by(token: token)
      end
    end
  end
end