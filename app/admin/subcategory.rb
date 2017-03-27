ActiveAdmin.register Subcategory do
  menu parent: 'Settings', priority: 2
  controller do
    def permitted_params
      params.permit subcategory: [:category_id, :name, :description, :id]
    end
  end
end
