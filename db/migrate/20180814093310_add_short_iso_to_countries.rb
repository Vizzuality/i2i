class AddShortIsoToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :short_iso, :string
  end
end
