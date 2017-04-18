class Contact < ApplicationRecord
  validates_presence_of :email
  validates_format_of :email, with: Devise.email_regexp

  validates :country, inclusion: { in: Country.all.map(&:iso) }

end

