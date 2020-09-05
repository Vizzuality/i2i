class AddLogoToCountries < ActiveRecord::Migration[5.2]
  def change
    add_column :countries, :logo_data, :text
  end
end
