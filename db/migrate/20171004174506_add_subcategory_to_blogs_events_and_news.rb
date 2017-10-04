class AddSubcategoryToBlogsEventsAndNews < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :subcategory_id, :integer
    add_column :news, :subcategory_id, :integer
    add_column :blogs, :subcategory_id, :integer
  end
end
