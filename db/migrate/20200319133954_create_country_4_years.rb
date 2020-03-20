class CreateCountry4Years < ActiveRecord::Migration[5.2]
  def change
    create_table :country_4_years do |t|
      t.integer :year
      t.float :total_msme
      t.float :total
      t.string :data_url

      t.references :country

      t.timestamps
    end
  end
end
