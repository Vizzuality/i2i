class CreateAnswerRegions < ActiveRecord::Migration[5.2]
  def change
    create_table :answer_regions do |t|
      t.integer :row_id, null: false
      t.integer :indicator_id, null: false
      t.integer :child_indicator_id
      t.integer :answer_id, null: false
      t.string :value
      t.float :weight, null: false
      t.string :iso, null: false
      t.integer :year, null: false

      t.references :region_4_year

      t.timestamps
    end
  end
end
