class CreateBlogsRegions < ActiveRecord::Migration[5.0]
  def change
    create_table :blogs_regions do |t|
      t.references :blog
      t.references :region

      t.timestamps
    end
  end
end
