ActiveAdmin.register Partner do
  controller do
    def permitted_params
      params.permit partner: [:name, :website_url, :logo, country_ids: [], region_ids: []]
    end
  end

  controller do
    def scoped_collection
      super.includes(:countries, :regions)
    end
  end

  index do
    selectable_column
    column :name
    column :countries
    column :regions
    column :created_at
    column :updated_at
    actions
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Partner details' do
      f.input :name
      f.input :website_url
      f.input :logo, as: :hidden, input_html: { value: f.object.cached_logo_data }
      f.input :logo, as: :file, hint: f.object.logo.present? ? image_tag(f.object.logo_url(:thumb)) : content_tag(:span, 'No image yet')

      f.input :countries, as: :check_boxes, collection: Country.pluck(:name, :id)
      f.input :regions, as: :check_boxes, collection: Region.pluck(:name, :id)

      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end

  show do |ad|
    attributes_table do
      row :name
      row :website_url
      row :logo do
        image_tag(ad.logo_url(:thumb)) unless ad.logo.blank?
      end
      row :countries
      row :regions
    end
  end
end
