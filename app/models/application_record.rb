class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def needs_featured_position
    if is_featured && featured_position.nil?
      create_featured_position
    elsif !is_featured && featured_position.present?
      featured_position.delete
    end
  end
end
