class CreateRegionPartners < ActiveRecord::Migration[5.0]
  def change
    create_table :region_partners do |t|
      t.references :region
      t.references :partner
      
      t.timestamps
    end
  end
end
