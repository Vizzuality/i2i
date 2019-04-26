class CreateCountryRegions < ActiveRecord::Migration[5.0]
  def change
    create_table :country_regions do |t|
      t.references :region
      t.references :country

      t.timestamps
    end
  end
end
