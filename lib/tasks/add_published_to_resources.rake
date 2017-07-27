namespace :db do
  desc 'Set all published to true'
  task add_published: :environment do
    puts 'News'
    News.update_all(published: true)
    puts 'Blogs'
    Blog.update_all(published: true)
    puts 'Events'
    Event.update_all(published: true)
    puts 'Libraries'
    Library.update_all(published: true)
  end
end
