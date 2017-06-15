ActiveAdmin.register Tag do
	menu parent: 'Settings', priority: 3
  controller do
    def permitted_params
      params.permit tag: [:name]
    end
  end

	form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Information' do
      f.input :name
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end
end
