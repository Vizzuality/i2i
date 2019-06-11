class CreateCommodities < ActiveRecord::Migration[5.0]
  def change
    create_table :commodities do |t|
      t.string :country_iso
      t.text :description

      t.timestamps
    end
  end
end
