module ActiveAdminHelper
	def self.format_date(date)
		date.strftime("%B %d, %Y")
	end
end