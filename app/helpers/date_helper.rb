module DateHelper
  def self.beautify(date)
    date.strftime('%b %d, %Y')
  end
end
