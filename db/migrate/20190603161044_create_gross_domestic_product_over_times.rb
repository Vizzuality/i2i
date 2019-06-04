class CreateGrossDomesticProductOverTimes < ActiveRecord::Migration[5.0]
  def change
    create_table :gross_domestic_product_over_times do |t|
      t.string :country_name
      t.string :iso
      t.string :indicator_name
      t.string :indicator_code
      (1960..2017).step(1) do |n|
        t.float n
      end

      t.timestamps
    end
  end
end
