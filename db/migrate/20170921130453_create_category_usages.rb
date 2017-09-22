class CreateCategoryUsages < ActiveRecord::Migration[5.0]
  def change
    create_table :category_usages do |t|
      t.string :category_type
      t.string :category_name
      t.string :subcategory
      t.string :project_name
      t.integer :num_rows
      t.integer :num_projects

      t.timestamps
    end
  end
end
