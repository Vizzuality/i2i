ActiveAdmin.register Category do
  menu parent: 'Settings', priority: 1
  controller do
    def permitted_params
      params.permit category: [:name, :description, :id]
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Category details' do
      f.input :name
      f.input :description
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end
end
