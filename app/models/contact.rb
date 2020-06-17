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
#  first_name :string
#  last_name  :string
#  title      :string
#  company    :string
#  message    :text
#

class Contact < ApplicationRecord
  #validates_presence_of :email
  validates :email, format: { with: Devise.email_regexp, message: 'Invalid email format' }

  # validates :country, inclusion: { in: Country.pluck(:iso) | Region.pluck(:iso) }
end

