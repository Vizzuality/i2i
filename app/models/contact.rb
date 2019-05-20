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

class Contact < ApplicationRecord
  validates_presence_of :email
  validates_format_of :email, with: Devise.email_regexp

  validates :country, inclusion: { in: Country.pluck(:iso) | Region.pluck(:iso) }

end

