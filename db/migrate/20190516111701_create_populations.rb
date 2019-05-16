class CreatePopulations < ActiveRecord::Migration[5.0]
  def change
    create_table :populations do |t|
      t.string :region
      t.string :country
      t.string :gender
      t.integer :year
      t.float :value

      t.timestamps
    end
  end
end
