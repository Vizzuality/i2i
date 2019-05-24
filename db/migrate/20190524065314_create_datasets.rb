class CreateDatasets < ActiveRecord::Migration[5.0]
  def change
    create_table :datasets do |t|
      t.references :category
      t.references :country
      t.references :user
      t.string :name, null: false
      
      t.timestamps
    end
  end
end
