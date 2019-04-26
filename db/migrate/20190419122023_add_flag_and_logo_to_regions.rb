class AddFlagAndLogoToRegions < ActiveRecord::Migration[5.0]
  def change
    add_column :regions, :flag_data, :text
    add_column :regions, :logo_data, :text
  end
end
