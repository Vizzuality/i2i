class RemoveSubcategoriesFromLibraries < ActiveRecord::Migration[5.0]
  def change
    remove_column :libraries, :subcategory_id
  end
end
