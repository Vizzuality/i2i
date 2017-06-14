ActiveAdmin.register Subcategory do
  menu parent: 'Settings', priority: 2
  controller do
    def permitted_params
      params.permit subcategory: [:category_id, :name, :description, :id]
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Subcategory details' do
      f.input :category
      f.input :name
      f.input :description
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end
end
