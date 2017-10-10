include ActiveAdminHelper

ActiveAdmin.register Library do
  config.per_page = 20
  config.sort_order = 'id_asc'

  filter :title

  scope :all, default: true
  Category.find_each do |c|
    scope c.name do |s|
      s.where(category_id: c.id)
    end
  end


  controller do
    # before_action :check_url_resource, only: [:show]

    # def check_url_resource
    #   library = Library.find_by(slug: params[:id])

    #   if library.document.present? && library.document.file.present?
    #     library.url_resource = request.base_url + library.document.file.url
    #     library.save
    #   else
    #     library.url_resource = ''
    #     library.save
    #   end
    # end

    def permitted_params
      params.permit library: [:title, :summary, :id, :published, :category_id,
                              :image, :date, :url_resource, :is_featured,
                              :video_url, :issuu_link,
                              tagged_items_attributes: [:tag_id, :id, :_destroy],
                              document_attributes: [:file, :name, :id, :_destroy],
                              documented_item_attributes: [:document_id, :id, :_destroy]
      ]
    end
  end

  index do
    selectable_column
    column :category
    column :title do |library|
      link_to library.title, admin_library_path(library)
    end
    column :published
    column :is_featured
    column :summary
    column :updated_at
    actions
  end


  form do |f|
    f.semantic_errors *f.object.errors.keys

    f.inputs 'Library details' do
      f.input :category_id,
              as: :select,
              collection: Category.all,
              include_blank: false
      f.input :title
      f.input :published
      f.input :is_featured
      f.input :summary
      f.input :date, as: :date_picker
      f.input :video_url
      f.has_many :tagged_items, allow_destroy: true, new_record: true, heading: 'Tags' do |a|
      	a.input :tag_id, as: :select, collection: Tag.all, allow_destroy: true
      end
      f.input :image, as: :file, hint: f.object.image.present? ? \
        image_tag(f.object.image.url(:thumb)) : content_tag(:span, 'No image yet')
      f.input :issuu_link

      if f.object.new_record?
        f.input :url_resource, placeholder: "Adding a download URL here will disable the possibility to add a Download Document until this URL is cleared"
        li "Please save Library before adding a document."
      else
        if (f.object.document.present? && f.object.document.file.present?) || f.object.url_resource.present?
          if f.object.document.present? && f.object.document.file.present?
            f.inputs "Document", for: [:document, f.object.document || create_document(f)] do |s|
              s.input :name
              s.input :file, as: :file, allow_destroy: true, hint: s.object.file.present? ? \
                "#{s.object.file_file_name}" : content_tag(:span, 'No PDF yet')

              s.input :_destroy, as: :boolean
            end
            li "To add an external Url resource, please clear this document"
          else
            f.input :url_resource
            li "To upload a document, please clear Url resource"
          end
        else
          li "Url resource and Document are used to display the DOWNLOAD button on a library, plase choose one to fill. In case both are filled in, Document will take priority."
          f.input :url_resource
          f.inputs "Document", for: [:document, f.object.document || create_document(f)] do |s|
                s.input :name
                s.input :file, as: :file, allow_destroy: true, hint: s.object.file.present? ? \
                  "#{s.object.file_file_name}" : content_tag(:span, 'No PDF yet')

                s.input :_destroy, as: :boolean
              end
        end
      end

      # Will preview the image when the object is edited
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end

  show do |ad|
    attributes_table do
      row :category
      row :date do
      	ActiveAdminHelper.format_date(ad.date)
      end
      row :title
      row :published
      row :is_featured
      row :summary
      row :tags do
      	ActiveAdminHelper.tags_names(ad.tags)
      end
      row :issuu_link
      row :url_resource
      row :document do
        if ad.document.present? && ad.document.file.present?
					raw link_to ad.document.file_file_name, request.base_url + ad.document.file.url
				end
      end
      row :image do
        image_tag(ad.image.url(:thumb)) unless ad.image.blank?
      end
    end
  end
end
