namespace :db do
  desc 'Add default categories'
  task add_categories: :environment do
    ['Multimedia','Blog','Interviews','Articles','Publications'].each do |category|
      Category.find_or_create_by(name: category)
    end
  end

  desc 'Add default categories for blogs, events, news, libraries'
  task add_default_category_for_insights: :environment do
    insights = [
      [Blog, Category.find_or_create_by(name: 'Blog')],
      [News, Category.find_or_create_by(name: 'Articles')],
      [Library, Category.find_or_create_by(name: 'Publications')],
      [Event, Category.find_or_create_by(name: 'Articles')]
    ]

    insights.each do |klass, category|
      klass.where(category: nil).each do |insight|
        insight.category = category
        insight.save
      end
    end
  end
end
