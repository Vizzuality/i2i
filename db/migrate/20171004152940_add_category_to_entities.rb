class AddCategoryToEntities < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :category_id, :integer
    add_column :blogs, :category_id, :integer
    add_column :news, :category_id, :integer
    add_column :libraries, :category_id, :integer
  end
end
