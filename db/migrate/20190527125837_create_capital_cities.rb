class CreateCapitalCities < ActiveRecord::Migration[5.0]
  def change
    create_table :capital_cities do |t|
      t.string :name
      t.integer :population
      t.string :country_iso
      t.string :capital_type

      t.timestamps
    end
  end
end
