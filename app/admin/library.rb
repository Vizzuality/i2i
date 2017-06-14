include ActiveAdminHelper

ActiveAdmin.register Library do

  config.per_page = 20
  config.sort_order = 'id_asc'

  belongs_to :subcategory, optional: true

  filter :title

  scope :all, default: true
  Category.find_each do |c|
    scope c.name do |s|
      s.where("subcategory_id in (#{c.subcategories.map{|x| x.id}.join(',')})")
    end
  end


  controller do
    def permitted_params
      params.permit library: [:title, :summary, :id,
                              :image, :date, :url_resource,
                              :video_url, :subcategory_id, :issuu_link]
    end
  end

  index do
    selectable_column
    column :subcategory

    column :title do |library|
      link_to library.title, admin_library_path(library)
    end
    column :summary
    column :updated_at
    actions
  end


  form do |f|
    f.semantic_errors *f.object.errors.keys

    f.inputs 'Library details' do
      f.input :subcategory_id,
              as: :select,
              collection:
                option_groups_from_collection_for_select(Category.all,
                                                         :subcategories, :name,
                                                         :id, :name, :id),
              include_blank: false
      f.input :title
      f.input :summary
      f.input :date, as: :date_picker
      f.input :url_resource
      f.input :video_url
      f.input :image, as: :file, hint: f.object.image.present? ? \
        image_tag(f.object.image.url(:thumb)) : content_tag(:span, 'No image yet')
      f.input :issuu_link
      # Will preview the image when the object is edited
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end


  show do |ad|
    attributes_table do
      row :subcategory
      row :date do
      	ActiveAdminHelper.format_date(ad.date)
      end
      row :title
      row :summary
      row :issuu_link
      row :image do
        image_tag(ad.image.url(:thumb)) unless ad.image.blank?
      end
    end
  end

end
