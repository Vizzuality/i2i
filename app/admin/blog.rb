ActiveAdmin.register Blog do

  config.per_page = 20
  config.sort_order = 'id_asc'

  filter :title

  controller do
    def permitted_params
      params.permit blog: [:title, :author, :workstream, :summary, :content, :id, :image, :date]
    end
  end

  index do
    selectable_column
    column :title do |blog|
      link_to blog.title, admin_blog_path(blog)
    end
    column :summary
    column :updated_at
    actions
  end


  form multipart: true do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Blog details' do
      f.input :title
      f.input :author
      f.input :workstream
      f.input :summary
      f.input :content, as: :ckeditor, input_html: { ckeditor: { height: 400 } }
      f.input :date, as: :date_picker
      f.input :image, as: :file, hint: f.object.image.present? ? \
        image_tag(f.object.image.url(:thumb)) : content_tag(:span, 'No image yet')
      # Will preview the image when the object is edited
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end


  show do |ad|
    attributes_table do
      row :title
      row :author
      row :workstream
      row :summary
      row :content
      row :date
      row :image do
        image_tag(ad.image.url(:thumb)) unless ad.image.blank?
      end
      # Will display the image on show object page
    end
  end

end
