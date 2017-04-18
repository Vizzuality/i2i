class AddIsoToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :iso, :string
  end
end
