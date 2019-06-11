class CreateEventsRegions < ActiveRecord::Migration[5.0]
  def change
    create_table :events_regions do |t|
      t.references :event
      t.references :region
      
      t.timestamps
    end
  end
end
