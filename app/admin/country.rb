ActiveAdmin.register Country do
  controller do
    def permitted_params
      params.permit country: [:name, :iso, :short_iso, :bbox, :bbox_raw]
    end
  end

  filter :name
  filter :iso
  filter :short_iso
  filter :created_at
  filter :updated_at

  index do
    selectable_column
    column :name do |country|
      link_to country.name, admin_country_path(country)
    end
    column :iso
    column :short_iso
    column :updated_at
    column :created_at
    actions
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Country details' do
      f.input :name
      f.input :iso
      f.input :short_iso
      f.input :bbox_raw, label: 'Bounding box'
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end

  show do |ad|
    attributes_table do
      row :name
      row :iso
      row :short_iso
      row :created_at
      row :updated_at
    end
  end
end
