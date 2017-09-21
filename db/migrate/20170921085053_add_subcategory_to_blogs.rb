class AddSubcategoryToBlogs < ActiveRecord::Migration[5.0]
  def change
    add_column :blogs, :subcategory_id, :integer
  end
end
