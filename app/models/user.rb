# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  token           :string
#  email           :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  has_secure_password
  has_secure_token

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
end
