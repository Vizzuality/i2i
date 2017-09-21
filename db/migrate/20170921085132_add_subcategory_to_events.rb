class AddSubcategoryToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :subcategory_id, :integer
  end
end
