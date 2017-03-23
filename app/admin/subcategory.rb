ActiveAdmin.register Subcategory do
  controller do
    def permitted_params
      params.permit subcategory: [:category_id, :name, :description, :id]
    end
  end
end
