class CreateGrossDomesticProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :gross_domestic_product_by_regions do |t|
      t.string :region
      t.string :country
      t.integer :year
      t.float :value

      t.timestamps
    end

    create_table :gross_domestic_product_by_sectors do |t|
      t.string :sector
      t.string :region
      t.string :country
      t.integer :year
      t.float :value

      t.timestamps
    end
  end
end
