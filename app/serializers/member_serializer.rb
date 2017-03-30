# == Schema Information
#
# Table name: members
#
#  id                 :integer          not null, primary key
#  name               :string
#  position           :string
#  organization_name  :string
#  biography          :text
#  role               :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  slug               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class MemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :position, :organization_name, :biography, :role, :slug

  def image
    object.image.url(:thumb)
  end

  def role
    RoleType.key_for(object.role.to_i)
  end
end
