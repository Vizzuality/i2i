class AddNameToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :name, :string
  end
end
