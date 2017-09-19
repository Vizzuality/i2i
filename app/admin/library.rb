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
      params.permit library: [:title, :summary, :id, :published,
                              :image, :date, :url_resource,
                              :video_url, :subcategory_id, :issuu_link,
                              tagged_items_attributes: [:tag_id, :id, :_destroy],
                              document_attributes: [:file, :name, :id, :_destroy],
                              documented_item_attributes: [:document_id, :id, :_destroy]
      ]
    end
  end

  index do
    selectable_column
    column :subcategory

    column :title do |library|
      link_to library.title, admin_library_path(library)
    end
    column :published
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
      f.input :published
      f.input :summary
      f.input :date, as: :date_picker
      f.input :url_resource
      f.input :video_url
      f.has_many :tagged_items, allow_destroy: true, new_record: true, heading: 'Tags' do |a|
      	a.input :tag_id, as: :select, collection: Tag.all, allow_destroy: true
      end
      f.input :image, as: :file, hint: f.object.image.present? ? \
        image_tag(f.object.image.url(:thumb)) : content_tag(:span, 'No image yet')
      f.input :issuu_link

      f.inputs "Document", for: [:document, f.object.document || create_document(f)] do |s|
        s.input :name
        s.input :file, as: :file, allow_destroy: true, hint: s.object.file.present? ? \
          "#{s.object.file_file_name}" : content_tag(:span, 'No PDF yet')

        s.input :_destroy, as: :boolean
      end

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
      row :published
      row :summary
      row :tags do
      	ActiveAdminHelper.tags_names(ad.tags)
      end
      row :issuu_link
      row :document do
        if ad.document.present?
					raw link_to ad.document.file_file_name, request.base_url + ad.document.file.url
				end
      end
      row :image do
        image_tag(ad.image.url(:thumb)) unless ad.image.blank?
      end
    end
  end

end
