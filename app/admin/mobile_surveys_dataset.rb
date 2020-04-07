ActiveAdmin.register MobileSurveysDataset do
  menu parent: 'Datasets', priority: 1

  actions :index, :show, :new, :create, :edit, :update, :destroy

  config.per_page = 20
  config.sort_order = 'created_at_desc'

  filter :year
  filter :iso_code
  filter :filename

  permit_params :year, :iso_code, :file, :filename

  controller do
    def new
      @mobile_surveys_dataset = MobileSurveysDataset.new
      super
    end

    def create
      create! do |success, failure|
        success.html do
          redirect_to admin_mobile_surveys_datasets_path,
            notice: 'Mobile surveys dataset was created successfully'
        end

        failure.html do
          render :new, flash: { error: resource.errors.messages }
        end
      end
    end

    def update
      update! do |success, failure|
        success.html do
          redirect_to admin_mobile_surveys_datasets_path,
            notice: 'Mobile surveys dataset was updated successfully'
        end

        failure.html do
          render :new, flash: { error: resource.errors.messages }
        end
      end
    end

    private

    def build_new_resource
      MobileSurveysDataset.new(resource_params)
    end

    def resource_params
      mobile_surveys_dataset_params =
        (permitted_params[:mobile_surveys_dataset] || {}).except(:file)
      filename = params.dig(:mobile_surveys_dataset, :file)&.original_filename
      mobile_surveys_dataset_params[:filename] = filename if filename
      mobile_surveys_dataset_params
    end
  end

  index do
    selectable_column
    column :year
    column :iso_code
    column :filename
    column :created_at
    column :updated_at
    actions
  end

  form multipart: true do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Mobile surveys dataset details' do
      f.input :year
      f.input :iso_code
      f.input :file, as: :file, hint: content_tag(:span, 'No file yet')

      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end

    f.actions
  end

  show do |dataset|
    attributes_table do
      row :year
      row :iso_code
      row :filename
    end
  end
end
