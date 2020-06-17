ActiveAdmin.register Region do
  filter :name
  filter :iso
  filter :countries
  filter :partners
  filter :created_at
  filter :updated_at

  controller do
    def permitted_params
      params.permit(:id, region: [:name, :iso, :flag, :logo, :background, :has_fsp_maps, country_ids: [], partner_ids: [],
                                  links_attributes: [:id, :name, :url, :_destroy]])
    end

    def scoped_collection
      super.includes(:partners, :countries)
    end
  end

  index do
    selectable_column
    column :name
    column :iso
    column :countries
    column :partners
    column :created_at
    column :updated_at
    actions
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Region details' do
      f.input :name
      f.input :iso

      f.input :background, as: :hidden, input_html: { value: f.object.cached_background_data }
      f.input :background, label: 'Background image', as: :file, hint: f.object.background.present? ? image_tag(f.object.background_url(:header)) : content_tag(:span, 'No image yet')

      f.input :flag, as: :hidden, input_html: { value: f.object.cached_flag_data }
      f.input :flag, as: :file, hint: f.object.flag.present? ? image_tag(f.object.flag_url(:thumb)) : content_tag(:span, 'No image yet')

      f.input :logo, as: :hidden, input_html: { value: f.object.cached_logo_data }
      f.input :logo, as: :file, hint: f.object.logo.present? ? image_tag(f.object.logo_url(:thumb)) : content_tag(:span, 'No image yet')

      f.has_many :links, allow_destroy: true, new_record: true, heading: 'Links' do |link_form|
        link_form.input :name
        link_form.input :url
      end

      f.input :countries, as: :check_boxes, collection: Country.pluck(:name, :id)
      f.input :partners, as: :check_boxes, collection: Partner.pluck(:name, :id)

      li "Created at #{f.object.created_at.to_formatted_s(:long_ordinal)}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at.to_formatted_s(:long_ordinal)}" unless f.object.new_record?
    end

    f.actions
  end

  show do |ad|
    attributes_table do
      row :name
      row :iso
      row :flag do
        image_tag(ad.flag_url(:thumb)) unless ad.flag.blank?
      end
      row :logo do
        image_tag(ad.logo_url(:thumb)) unless ad.logo.blank?
      end
      row :countries
      row :partners
    end
  end
end
