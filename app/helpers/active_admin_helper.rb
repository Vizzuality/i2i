module ActiveAdminHelper
	def self.tags_names(tags)
		tags.pluck(:name).join(', ')
  end

  def self.format_date(date)
    date.strftime("%B %d, %Y")
  end
end
