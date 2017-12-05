class CreateFeaturedPositions < ActiveRecord::Migration[5.0]
  def change
    create_table :featured_positions do |t|
      t.integer :position
      t.references :positionable, polymorphic: true, index: { name: "index_featured_positions_on_positionable" }

      t.timestamps
    end
  end
end
