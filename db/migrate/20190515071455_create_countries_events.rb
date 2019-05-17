class CreateCountriesEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :countries_events do |t|
      t.references :country
      t.references :event

      t.timestamps
    end
  end
end
