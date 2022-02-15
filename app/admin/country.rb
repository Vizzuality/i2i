ActiveAdmin.register Country do
  filter :name
  filter :iso
  filter :short_iso
  filter :regions
  filter :partners
  filter :created_at
  filter :updated_at

  controller do
    def permitted_params
      params.permit country: [:name, :iso, :short_iso, :bbox, :bbox_raw, :background, :has_fsp_maps,
                              :flag, :logo,
                              region_ids: [],
                              partner_ids: [],
                              links_attributes: [:id, :name, :url, :_destroy]]
    end

    def scoped_collection
      super.includes(:partners, :regions)
    end
  end

  index do
    selectable_column
    column :name do |country|
      link_to country.name, admin_country_path(country)
    end
    column :iso
    column :short_iso
    column :regions
    column :partners
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

      f.input :flag, as: :hidden, input_html: { value: f.object.cached_flag_data }
      f.input :flag, as: :file, hint: f.object.flag.present? ? image_tag(f.object.flag_url(:thumb), width: 200, height: 100) : content_tag(:span, 'No image yet')

      f.input :logo, as: :hidden, input_html: { value: f.object.cached_logo_data }
      f.input :logo, as: :file, hint: f.object.logo.present? ? image_tag(f.object.logo_url(:thumb), width: 100, height: 100) : content_tag(:span, 'No image yet')

      f.input :background, as: :hidden, input_html: { value: f.object.cached_background_data }
      f.input :background, label: 'Background image', as: :file, hint: f.object.background.present? ? image_tag(f.object.background_url(:header)) : content_tag(:span, 'No image yet')

      f.input :has_fsp_maps, label: 'Has Geospatial data'

      f.has_many :links, allow_destroy: true, new_record: true, heading: 'Links' do |link_form|
        link_form.input :name
        link_form.input :url
      end

      f.input :regions, as: :check_boxes, collection: Region.pluck(:name, :id)
      f.input :partners, as: :check_boxes, collection: Partner.pluck(:name, :id)

      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end

  show do |ad|
    attributes_table do
      row :name
      row :iso
      row :flag do
        image_tag(ad.flag_url(:thumb), width: 200, height: 100) unless ad.flag.blank?
      end
      row :logo do
        image_tag(ad.logo_url(:thumb), width: 100, height: 100) unless ad.logo.blank?
      end
      row :short_iso
      row :regions
      row :partners
      row :created_at
      row :updated_at
    end
  end
end
