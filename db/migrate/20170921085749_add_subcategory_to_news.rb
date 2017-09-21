class AddSubcategoryToNews < ActiveRecord::Migration[5.0]
  def change
    add_column :news, :subcategory_id, :integer
  end
end
