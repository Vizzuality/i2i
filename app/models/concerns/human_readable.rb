module HumanReadable
  extend ActiveSupport::Concern
  
  module ClassMethods
    def human_readable(number)
      ActionController::Base.helpers.number_to_human(number,
        :format => '%n%u',
        :precision => 3,
        :units => {
          :thousand => 'K',
          :million => 'M',
          :billion => 'B'
        })
    end
  end
end