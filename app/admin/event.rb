include ActiveAdminHelper

ActiveAdmin.register Event do
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
    def create
      if params[:commit] == 'Preview'
        if permitted_params['event']['image'].present?
          image = permitted_params['event']['image']
          image.tempfile.binmode
          image.tempfile = Base64.encode64(image.tempfile.read)
        else
          session[:skip_image] = true
        end

        session[:data] = permitted_params['event']

        redirect_to updates_events_preview_path
      else
        super
      end
    end

    def update
      if params[:commit] == 'Preview'
        session[:data] = permitted_params['event']

        if permitted_params['event']['image'].present?
          image = permitted_params['event']['image']
          image.tempfile.binmode
          image.tempfile = Base64.encode64(image.tempfile.read)
        else
          image = Event.find_by(slug: permitted_params[:id]).image
          session[:data][:image] = image
          session[:has_image] = true
        end

        redirect_to updates_events_preview_path
      else
        super
      end
    end

    def permitted_params
      params.permit(:id, event: [:title, :author, :url, :summary, :content, :id, :image, :date,
                                 :published, :custom_author, :category_id, :is_featured, :position,
                                 documents_attributes: [:file, :name, :id, :_destroy],
                                 tagged_items_attributes: [:tag_id, :id, :_destroy],
                                 documented_items_attributes: [:document_id, :id, :_destroy],
                                 featured_position_attributes: [:id, :position, :_destroy]])
    end
  end

  index do
    selectable_column
    column :category
    column :title do |event|
      link_to event.title, admin_event_path(event)
    end
    column :published
    column :is_featured
    column :summary
    column :updated_at
    actions
  end


  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Event details' do
      f.input :category_id,
              as: :select,
              collection: Category.all,
              include_blank: false
      f.input :title
      f.input :author, as: :select, collection: Member.all.pluck(:name)
      f.input :custom_author, placeholder: 'This will take priority over author.'
      f.input :published
      f.input :is_featured
      f.has_many :featured_position, allow_destroy: true, new_record: true, heading: 'Position (only for featured)' do |a|
        a.input :position
      end
      f.input :url
      f.input :summary
      f.input :content, as: :ckeditor, input_html: { ckeditor: { height: 400 } }
      f.input :date, as: :date_picker
      f.has_many :tagged_items, allow_destroy: true, new_record: true, heading: 'Tags' do |a|
        a.input :tag_id, as: :select, collection: Tag.all, allow_destroy: true
      end
      f.has_many :documents, allow_destroy: true, new_record: true, heading: 'Documents' do |a|
        a.input :name
        a.input :file, as: :file, allow_destroy: true, hint: a.object.file.present? ? \
          "#{a.object.file_file_name}" : content_tag(:span, 'No PDF yet')
      end
      f.input :image, as: :file, hint: f.object.image.present? ? \
        image_tag(f.object.image.url(:thumb)) : content_tag(:span, 'No image yet')
      # Will preview the image when the object is edited
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.submit "Preview"
    f.actions
  end


  show do |ad|
    attributes_table do
      row :category
      row :date do
      	ActiveAdminHelper.format_date(ad.date)
      end
      row :subcategory
      row :title
      row :author
      row :custom_author
      row :published
      row :is_featured
      row :position do
        ActiveAdminHelper.position(ad.featured_position)
      end
      row :url
      row :summary
      row :tags do
        ActiveAdminHelper.tags_names(ad.tags)
      end
      row :content
      row :documents do
        if ad.documents.present?
          links = ad.documents.map do |document|
            link_to document.file_file_name, request.base_url + document.file.url
          end.join(', ')

          raw links
        end
      end
      row :image do
        image_tag(ad.image.url(:thumb)) unless ad.image.blank?
      end
      # Will display the image on show object page
    end
  end
end
