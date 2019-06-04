class AddBackgroundToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :background_data, :text
  end
end
