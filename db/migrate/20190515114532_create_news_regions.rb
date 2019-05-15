class CreateNewsRegions < ActiveRecord::Migration[5.0]
  def change
    create_table :news_regions do |t|
      t.references :news
      t.references :region

      t.timestamps
    end
  end
end
