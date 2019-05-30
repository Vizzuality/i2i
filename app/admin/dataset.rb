include ActionView::Helpers::NumberHelper

ActiveAdmin.register Dataset do
  config.per_page = 20
  config.sort_order = 'created_at_desc'
  
  filter :title

  member_action :publish, method: :put do
  end

  controller do
    def permitted_params
      params.permit(:id, dataset: [:name, :country_id, :category, :file, :status, :user_id])
    end
    
    def publish
      publish_service = PublishDataset.new(params[:id])
      
      if publish_service.perform
        redirect_to admin_datasets_path, notice: publish_service.message
      else
        redirect_to admin_datasets_path, alert: publish_service.message
      end
    end
    
    def destroy
      dataset = Dataset.find(params[:id])
      
      if dataset.published?
        delete_service = DeleteDatasetFromCarto.new(dataset.id)
  
        if delete_service.perform
          dataset.destroy
          redirect_to admin_datasets_path, notice: delete_service.message
        else
          redirect_to admin_datasets_path, alert: delete_service.message
        end
      else
        super
      end
    end
  end
  
  index do
    selectable_column
    column :name
    column :country
    column :category
    column 'File' do |dataset|
      if dataset.file.present?
        link_to "#{dataset.file.original_filename} (#{number_to_human_size(dataset.file.size)})",
                dataset.file_url,
                download: dataset.file.original_filename
      end
    end
    
    column :status do |dataset|
      case dataset.status
      when 'unpublished' then status_tag('Unpublished')
      when 'pending' then status_tag('Pending', class: 'orange')
      when 'published' then status_tag('Published', class: 'green')
      else status_tag(dataset.status)
      end
    end
    column :user
    column :created_at
    column :updated_at
    column 'CSV validation' do |dataset|
      if dataset.file.present? && dataset.csv_is_valid
        status_tag('valid', class: 'green')
      elsif dataset.file.present?
        status_tag('invalid', class: 'red')
        content_tag(:p, dataset.csv_errors, class: 'invalid')
      else
        status_tag('invalid', class: 'red')
        content_tag(:p, "CSV is not uploaded", class: 'invalid')
      end
    end
    actions do |dataset|
      if dataset.pending? && dataset.csv_is_valid
        item 'Publish', publish_admin_dataset_path(dataset), method: :put
      end
    end
  end
  
  form multipart: true do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Dataset details' do
      f.input :name
      f.input :country, as: :select, collection: Country.all, include_blank: false
      f.input :category, as: :select, collection: Dataset.categories.map {|name, _| [name.humanize, name] }, include_blank: false
      f.input :status, as: :select, collection: Dataset.statuses.map {|name, _| [name.humanize, name] }, include_blank: false
      f.input :user, as: :select, collection: User.all.map {|u| [u.name_or_email, u.id]}, include_blank: false
      f.input :file, as: :hidden, input_html: { value: f.object.cached_file_data }
      f.input :file, as: :file, hint: f.object.file.present? ? content_tag(:span, f.object.file.original_filename) : content_tag(:span, 'No file yet')
      
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    
    f.actions
  end
  
  show do |dataset|
    attributes_table do
      row :name
      row :country
      row :category
      row :file do
        if dataset.file.present?
          link_to "#{dataset.file.original_filename} (#{number_to_human_size(dataset.file.size)})",
                  dataset.file_url,
                  download: dataset.file.original_filename
        end
      end
      row :status
      row :user do |d|
        link_to d.user.name_or_email, admin_user_path(d.user)
      end
    end
  end
end
