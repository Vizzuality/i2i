# == Schema Information
#
# Table name: contacts
#
#  id         :integer          not null, primary key
#  email      :string
#  country    :string
#  year       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ContactSerializer < ActiveModel::Serializer
  attributes :id, :email, :country, :year
end
