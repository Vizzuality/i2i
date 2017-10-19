module Api
  class CategoryUsagesController < ApiController
    # before_action :require_login

    def index
      category_usages = CategoryUsage.filter(params.slice(:category_type, :category_name, :subcategory))
      category_usages = category_usages.page(params[:page]).per(params[:per_page])

      render json: category_usages, adapter: :json, meta: meta(category_usages), root: 'data'
    end
  end
end
