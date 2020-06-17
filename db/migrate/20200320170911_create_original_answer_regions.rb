class CreateOriginalAnswerRegions < ActiveRecord::Migration[5.2]
  def change
    create_table :original_answer_regions do |t|
      t.jsonb :answer, null: false
      t.string :iso, null: false
      t.integer :year, null: false

      t.references  :region_4_year

      t.timestamps
    end
  end
end
