ActiveAdmin.register Library do

  config.per_page = 20
  config.sort_order = 'id_asc'

  filter :title
  filter :content_type, as: :select, collection: proc { LibraryType.to_a }

  controller do
    def permitted_params
      params.permit library: [:title, :summary, :content, :id, :image, :content_type, :date, :url_resource, :video_url]
    end
  end

  index do
    selectable_column
    column :content_type do |record|
      if record.content_type
        LibraryType.key_for(record.content_type.to_i)
      else
        '-'
      end
    end

    column :title do |library|
      link_to library.title, admin_library_path(library)
    end
    column :summary
    column :content_type
    column :updated_at
    actions
  end


  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Library details' do
      f.input :content_type, as: :select, collection: LibraryType.to_a
      f.input :title
      f.input :summary
      f.input :content
      f.input :date
      f.input :url_resource
      f.input :video_url
      f.input :image, :as => :file, :hint => f.template.image_tag(f.object.image.url(:image))
      # Will preview the image when the object is edited
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end


  show do |ad|
    attributes_table do
      row :title
      row :summary
      row :content
      row :image do
        image_tag(ad.image.url(:image))
      end
      # Will display the image on show object page
    end
  end

end
