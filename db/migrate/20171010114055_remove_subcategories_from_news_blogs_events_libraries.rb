class RemoveSubcategoriesFromNewsBlogsEventsLibraries < ActiveRecord::Migration[5.0]
  def change
    remove_column :blogs, :subcategory_id
    remove_column :events, :subcategory_id
    remove_column :news, :subcategory_id
    remove_column :libraries, :subcategory_id
  end
end
