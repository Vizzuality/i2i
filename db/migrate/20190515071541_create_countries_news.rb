class CreateCountriesNews < ActiveRecord::Migration[5.0]
  def change
    create_table :countries_news do |t|
      t.references :country
      t.references :news

      t.timestamps
    end
  end
end
