# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
User.create(name: 'Web User', email: 'webuser@example.com', password: 'password')

size = Category.create(name: 'size')
Subcategory.create(name: 'large', category_id: size.id)
Subcategory.create(name: 'medium', category_id: size.id)
Subcategory.create(name: 'small', category_id: size.id)

color = Category.create(name: 'color')
Subcategory.create(name: 'red', category_id: color.id)
Subcategory.create(name: 'blue', category_id: color.id)
Subcategory.create(name: 'green', category_id: color.id)

Blog.create(category_id: 1, subcategory_id: 1, title: 'first blog created', summary: 'first blog summary coooool', published: true)
Blog.create(category_id: 1, subcategory_id: 3, title: 'this is second blog', summary: 'long summary', published: true)
Blog.create(category_id: 2, subcategory_id: 1, title: 'looks nice blog 3', summary: 'should have color', published: true)
Blog.create(category_id: 2, subcategory_id: 2, title: 'fourth time', summary: 'no longer available', published: true)

Event.create(category_id: 1, subcategory_id: 2, title: 'Event is happening', summary: 'random stuff here', published: true)
Event.create(category_id: 1, subcategory_id: 3, title: 'Event again go go happening', summary: 'sum it up', published: true)
Event.create(category_id: 2, subcategory_id: 1, title: 'third event', summary: 'event cool', published: true)
Event.create(category_id: 2, subcategory_id: 3, title: 'say something', summary: 'sand beach', published: true)

News.create(category_id: 1, subcategory_id: 1, title: 'news good', summary: 'things', published: true)
News.create(category_id: 1, subcategory_id: 2, title: 'newsaround the globe good', summary: 'round ball', published: true)
News.create(category_id: 2, subcategory_id: 2, title: 'bad things', summary: 'square ball', published: true)
News.create(category_id: 2, subcategory_id: 3, title: 'just things', summary: 'square triangle', published: true)