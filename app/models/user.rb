# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  name                   :string
#  surname                :string
#  company                :string
#  position               :string
#  city                   :string
#  country                :string
#  attribution            :string
#  token                  :string
#  email                  :string
#  encrypted_password     :string
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  has_secure_token

  has_many :datasets, dependent: :destroy

  validates :terms_of_service, acceptance: true

  # This method is not available in has_secure_token
  def invalidate_token
    self.update_columns(token: nil)
  end

  def self.valid_login?(email, password)
    user = find_by(email: email)
    if user && user.authenticate(password)
      user
    end
  end

  def name_or_email
    full_name.presence || email
  end

  def full_name
    [name, surname].join(' ')
  end
end
