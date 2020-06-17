class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.integer :row_id, null: false
      t.string :indicator_id, null: false
      t.integer :child_indicator_id
      t.integer :answer_id, null: false
      t.string :value
      t.float :weight, null: false
      t.string :iso, null: false
      t.integer :year, null: false

      t.references :country_4_year

      t.timestamps
    end
  end
end
