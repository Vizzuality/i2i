namespace :db do
  desc 'Add slugs'
  task add_slugs: :environment do
    puts 'News'
    News.find_each(&:save)
    puts 'Blogs'
    Blog.find_each(&:save)
    puts 'Events'
    Event.find_each(&:save)
    puts 'Libraries'
    Library.find_each(&:save)
  end
end
