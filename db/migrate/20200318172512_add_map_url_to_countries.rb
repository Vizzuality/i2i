class AddMapUrlToCountries < ActiveRecord::Migration[5.2]
  def change
    add_column :countries, :map_url, :string
  end
end
