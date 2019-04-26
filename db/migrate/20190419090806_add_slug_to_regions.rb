class AddSlugToRegions < ActiveRecord::Migration[5.0]
  def change
    add_column :regions, :slug, :string, null: false
    add_index :regions, :slug, unique: true
  end
end
