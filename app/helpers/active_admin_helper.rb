module ActiveAdminHelper
	def self.tags_names(tags)
		tags.pluck(:name).join(', ')
  end

  def self.position(featured_position)
    featured_position.position rescue nil
  end

  def self.format_date(date)
    date.strftime("%B %d, %Y")
  end

  def create_document(f)
    new_document = f.object.build_documented_item.build_document

    new_document.documented_items << f.object.build_documented_item
    new_document.save
    new_document
  end
end
