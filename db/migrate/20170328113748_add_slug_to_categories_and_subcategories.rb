class AddSlugToCategoriesAndSubcategories < ActiveRecord::Migration[5.0]
  def change
    add_column :categories, :slug, :string
    add_column :subcategories, :slug, :string
  end
end
