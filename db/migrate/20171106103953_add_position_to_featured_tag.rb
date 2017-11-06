class AddPositionToFeaturedTag < ActiveRecord::Migration[5.0]
  def change
    add_column :tags, :position, :integer
  end
end
