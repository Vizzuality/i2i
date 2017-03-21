class MemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :position, :organization_name, :biography, :role, :slug

  def image
    object.image.url(:thumb)
  end

  def role
    RoleType.key_for(object.role.to_i)
  end
end
