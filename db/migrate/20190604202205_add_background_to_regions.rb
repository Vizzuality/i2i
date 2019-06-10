class AddBackgroundToRegions < ActiveRecord::Migration[5.0]
  def change
    add_column :regions, :background_data, :text
  end
end
