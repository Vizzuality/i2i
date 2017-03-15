ActiveAdmin.register Member do
  menu parent: 'Users', priority: 1

  config.per_page = 20

  filter :name

  scope :all, default: true
  scope :team do |members|
    members.where("role = '#{RoleType::TEAM}'")
  end
  scope :advisor do |members|
    members.where("role = '#{RoleType::ADVISOR}'")
  end

  controller do
    def permitted_params
      params.permit member: [:name, :position, :organization_name, :image, :id, :biography, :role]
    end
  end

  index as: :grid do |member|
    a truncate(member.name), href: admin_member_path(member)
    div do
      'Position: ' + truncate(member.position)
    end
    if member.role
      div do
        'Role: ' + RoleType.key_for(member.role.to_i).to_s
      end
    end

    div do
      a :href => admin_member_path(member) do
        image_tag(member.image, size:'175x225')
      end
    end
  end


  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Member details' do
      f.input :name
      f.input :position
      f.input :organization_name
      f.input :role, as: :select, collection: RoleType.to_a
      f.input :biography, as: :ckeditor, input_html: { ckeditor: { height: 400 } }
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
      row :name
      row :position
      row :organization_name
      row :role
      row :biography
      row :image do
        image_tag(ad.image.url(:thumb)) unless ad.image.blank?
      end
      # Will display the image on show object page
    end
  end
end
