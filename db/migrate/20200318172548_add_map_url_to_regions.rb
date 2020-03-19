class AddMapUrlToRegions < ActiveRecord::Migration[5.2]
  def change
    add_column :regions, :map_url, :string
  end
end
