class AddFlagDataToCountries < ActiveRecord::Migration[5.2]
  def change
    add_column :countries, :flag_data, :text
  end
end
