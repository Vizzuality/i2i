class AddBboxToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :bbox, :string, array: true, default: []
  end
end
