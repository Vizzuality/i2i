include ActiveAdminHelper

ActiveAdmin.register Blog do

  config.per_page = 20
  config.sort_order = 'date_desc'

  belongs_to :subcategory, optional: true

  filter :title

  scope :all, default: true
  Category.find_each do |c|
    scope c.name do |s|
      s.where("subcategory_id in (#{c.subcategories.map{|x| x.id}.join(',')})")
    end
  end

  controller do
    def create
      if params[:commit] == 'Preview'
        if permitted_params['blog']['image'].present?
          image = permitted_params['blog']['image']
          image.tempfile.binmode
          image.tempfile = Base64.encode64(image.tempfile.read)
        else
          session[:skip_image] = true
        end

        session[:data] = permitted_params['blog']

        redirect_to updates_blogs_preview_path
      else
        super
      end
    end

    def update
      if params[:commit] == 'Preview'
        session[:data] = permitted_params['blog']

        if permitted_params['blog']['image'].present?
          image = permitted_params['blog']['image']
          image.tempfile.binmode
          image.tempfile = Base64.encode64(image.tempfile.read)
        else
          image = Blog.find_by(slug: permitted_params[:id]).image
          session[:data][:image] = image
          session[:has_image] = true
        end

        redirect_to updates_blogs_preview_path
      else
        super
      end
    end

    def permitted_params
      params.permit(:id, blog: [:title, :author, :workstream, :summary, :content, :id, :image, :date,
                                :issuu_link, :published, :custom_author, :subcategory_id,
                                tagged_items_attributes: [:tag_id, :id, :_destroy]])
    end
  end

  index do
    selectable_column

    column :subcategory
    column :title do |blog|
      link_to blog.title, admin_blog_path(blog)
    end
    column :summary
    column :published
    column :updated_at
    column :date do |blog|
    	ActiveAdminHelper.format_date(blog.date)
    end
    actions
  end


  form multipart: true do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Blog details' do
      f.input :subcategory_id,
              as: :select,
              collection:
                option_groups_from_collection_for_select(Category.all,
                                                         :subcategories, :name,
                                                         :id, :name, :id),
              include_blank: false
      f.input :title
      f.input :author, as: :select, collection: Member.all.pluck(:name)
      f.input :custom_author, placeholder: 'This will take priority over author.'
      f.input :published
      f.input :workstream
      f.input :summary
      f.input :content, as: :ckeditor, input_html: { ckeditor: { height: 400 } }
      f.has_many :tagged_items, allow_destroy: true, new_record: true, heading: 'Tags' do |a|
        a.input :tag_id, as: :select, collection: Tag.all, allow_destroy: true
      end
      f.input :date, as: :date_picker
      f.input :issuu_link
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
      row :subcategory
      row :title
      row :author
      row :custom_author
      row :published
      row :workstream
      row :summary
      row :tags do
        ActiveAdminHelper.tags_names(ad.tags)
      end
      row :content
      row :date do
      	ActiveAdminHelper.format_date(ad.date)
      end
      row :issuu_link
      row :image do
        image_tag(ad.image.url(:thumb)) unless ad.image.blank?
      end
      # Will display the image on show object page
    end
  end

end
