class CreateCountriesLibraries < ActiveRecord::Migration[5.0]
  def change
    create_table :countries_libraries do |t|
      t.references :country
      t.references :library

      t.timestamps
    end
  end
end
