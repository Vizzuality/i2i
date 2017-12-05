ActiveAdmin.register FeaturedPosition do
  config.per_page = 20
  config.sort_order = 'position_asc'

  actions  :index, :edit, :show, :update, :destroy

  controller do
    def permitted_params
      params.permit(:id, featured_position: [:position])
    end
  end

  index do
    selectable_column
    column :positionable
    column :position
    column :positionable_type
    column :updated_at
    column :created_at
    actions
  end

  form multipart: true do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Blog details' do
      f.input :position
      li "Created at #{f.object.created_at}" unless f.object.new_record?
      li "Updated at #{f.object.updated_at}" unless f.object.new_record?
    end
    f.actions
  end

end
