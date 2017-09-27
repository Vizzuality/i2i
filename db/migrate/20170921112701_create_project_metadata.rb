class CreateProjectMetadata < ActiveRecord::Migration[5.0]
  def change
    create_table :project_metadata do |t|
      t.string :project_name
      t.string :name
      t.string :country_iso2
      t.string :country_iso3
      t.string :currency_singular
      t.string :currency_plural
      t.string :currency_code
      t.string :currency_symbol
      t.integer :num_households_in_hh
      t.integer :num_households_in_mem
      t.integer :member_level_interviews
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps
    end
  end
end
