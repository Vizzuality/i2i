class CreateOriginalAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :original_answers do |t|
      t.jsonb :answer, null: false
      t.string :iso, null: false
      t.integer :year, null: false

      t.references  :country_4_year

      t.timestamps
    end
  end
end
