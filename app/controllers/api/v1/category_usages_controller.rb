module Api
  module V1
    class CategoryUsagesController < ApiController
      def index
        category_usages = CategoryUsage.filter(params.slice(:category_type, :category_name, :subcategory))
        category_usages = category_usages.page(params[:page])

        render json: category_usages, adapter: :json, meta: meta(category_usages)
      end
    end
  end
end
