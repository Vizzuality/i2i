class CreateRegion4Years < ActiveRecord::Migration[5.2]
  def change
    create_table :region_4_years do |t|
      t.integer :year
      t.float :total
      t.string :data_url

      t.references :region

      t.timestamps
    end
  end
end
