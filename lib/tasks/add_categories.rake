namespace :db do
  desc 'Add default categories'
  task add_categories: :environment do
    categories = [
      { category: 'Publications',
        subcategories: ['Notes', 'Frameworks', 'Proceedings',
                        'Reports', 'i2i Communities'] },
      { category: 'Videos',
        subcategories: ['Presentations', 'Workshops',
                        'Interviews', 'i2i Communities'] },
      { category: 'Graphics',
        subcategories: %w(Infographics Graphs Facts) },
      { category: 'Presentations',
        subcategories: ['Workshops', 'Events', 'i2i Communities'] }
    ]

    categories.each do |c|
      category = Category.new name: c[:category]
      c[:subcategories].each do |sc|
        subcategory = Subcategory.new name: sc
        category.subcategories << subcategory
      end
      category.save
    end
  end
end
