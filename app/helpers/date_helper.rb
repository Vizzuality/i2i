module DateHelper
  def self.beautify(date)
    date.strftime('%b %d, %Y')
  end

  def self.setCronology(date)
    if date > DateTime.now.to_date
      'upcoming'
    elsif date < DateTime.now.to_date
      'past'
    else
      'present'
    end
  end
end
