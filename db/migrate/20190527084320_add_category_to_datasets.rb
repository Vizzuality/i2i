class AddCategoryToDatasets < ActiveRecord::Migration[5.0]
  def change
    remove_reference :datasets, :category
    add_column :datasets, :category, :integer, null: false, default: 0
  end
end
