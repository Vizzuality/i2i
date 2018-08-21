class AddHasFspMapsToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :has_fsp_maps, :boolean, default: false
  end
end
