include ActiveAdminHelper

ActiveAdmin.register News do

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
    def create
      if params[:commit] == 'Preview'
        if permitted_params['news']['image'].present?
          image = permitted_params['news']['image']
          image.tempfile.binmode
          image.tempfile = Base64.encode64(image.tempfile.read)
        else
          session[:skip_image] = true
        end

        session[:data] = permitted_params['news']

        redirect_to updates_news_preview_path
      else
        super
      end
    end

    def update
      if params[:commit] == 'Preview'
        session[:data] = permitted_params['news']

        if permitted_params['news']['image'].present?
          image = permitted_params['news']['image']
          image.tempfile.binmode
          image.tempfile = Base64.encode64(image.tempfile.read)
        else
          image = News.find_by(slug: permitted_params[:id]).image
          session[:data][:image] = image
          session[:has_image] = true
        end

        redirect_to updates_news_preview_path
      else
        super
      end
    end

    defaults :route_collection_name => 'news_index', :route_instance_name => 'news'
    def permitted_params
      params.permit(:id, news: [:title, :author, :summary, :content, :id, :image, :date, :issuu_link, :published, :subcategory_id])
    end
  end

  index do
    selectable_column

    column :subcategory
    column :title do |news|
      link_to news.title, admin_news_path(news)
    end
    column :published
    column :summary
    column :updated_at
    actions
  end


  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'News details' do
      f.input :subcategory_id,
              as: :select,
              collection:
                option_groups_from_collection_for_select(Category.all,
                                                         :subcategories, :name,
                                                         :id, :name, :id),
              include_blank: false
      f.input :author, as: :select, collection: Member.all.pluck(:name)
      f.input :title
      f.input :published
      f.input :summary
      f.input :content, as: :ckeditor, input_html: { ckeditor: { height: 400 } }
      f.input :date, as: :date_picker
      f.input :image, as: :file, hint: f.object.image.present? ? \
        image_tag(f.object.image.url(:thumb)) : content_tag(:span, 'No image yet')
      f.input :issuu_link
      # Will preview the image when the object is edited
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.submit "Preview"
    f.actions
  end


  show do |ad|
    attributes_table do
      row :date do
      	ActiveAdminHelper.format_date(ad.date)
      end
      row :subcategory
      row :title
      row :author
      row :published
      row :summary
      row :content
      row :issuu_link
      row :image do
        image_tag(ad.image.url(:thumb)) unless ad.image.blank?
      end
      # Will display the image on show object page
    end
  end
end
