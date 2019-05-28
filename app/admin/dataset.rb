include ActionView::Helpers::NumberHelper

ActiveAdmin.register Dataset do
  config.per_page = 20
  config.sort_order = 'created_at_desc'
  
  filter :title

  controller do
    def permitted_params
      params.permit(:id, dataset: [:name, :country_id, :category, :file, :status, :user_id])
    end
  end

  member_action :publish, method: :put do
    dataset = Dataset.find(params[:id])
    dataset.published!
    
    redirect_to admin_datasets_path, notice: "Dataset was published."
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
    
    column :status
    column :user
    column :created_at
    column :updated_at
    actions do |dataset|
      if dataset.pending?
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
