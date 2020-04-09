namespace :countries do
  desc 'Add existing flags to countries'
  task add_flags: :environment do
    Country.all.each do |country|
      filepath = Rails.root.join('public', 'images', 'flags', "#{country.iso}.svg")
      next unless File.exist?(filepath)

      file = File.open(filepath)
      country.update_attributes(flag: file)
    end
  end
end
