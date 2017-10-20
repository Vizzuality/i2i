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
#  date               :date
#  order              :integer
#

class Member < ApplicationRecord
  # Validations for paperclip
  has_attached_file :image, styles: {thumb: '300x300>'}
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  has_enumeration_for :role, with: RoleType, skip_validation: true
  before_validation :generate_slug

  validates_presence_of :name

  def image_url
    image.url
  end

  private
    def generate_slug
      write_attribute(:slug, self.name.parameterize)
    end
end
