class CreateLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :links do |t|
      t.string :name
      t.string :url, null: false, default: ''
      t.references :country
      t.references :region

      t.timestamps
    end
  end
end
