class CreateCountryPartners < ActiveRecord::Migration[5.0]
  def change
    create_table :country_partners do |t|
      t.references :country
      t.references :partner

      t.timestamps
    end
  end
end
