class ContactSerializer < ActiveModel::Serializer
  attributes :id, :email, :country, :year
end
