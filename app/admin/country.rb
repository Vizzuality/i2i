ActiveAdmin.register Country do
  controller do
    def permitted_params
      params.permit country: [:name, :iso, :short_iso, :bbox, :bbox_raw,
                              region_ids: [],
                              partner_ids: [],
                              links_attributes: [:id, :name, :url, :_destroy]]
    end
  end

  filter :name
  filter :iso
  filter :short_iso
  filter :regions
  filter :partners
  filter :created_at
  filter :updated_at

  controller do
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
      row :short_iso
      row :regions
      row :partners
      row :created_at
      row :updated_at
    end
  end
end
