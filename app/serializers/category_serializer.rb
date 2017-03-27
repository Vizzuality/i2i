# == Schema Information
#
# Table name: categories
#
#  id          :integer          not null, primary key
#  name        :string
#  slug        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#


class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :subcategories
end
