class AddIndexesToAnswers < ActiveRecord::Migration[5.2]
  def change
    add_index :answers, :indicator_id, name: 'index_answers_on_indicator_id'
    add_index :answers, :iso, name: 'index_answers_on_iso'
    add_index :answers, :year, name: 'index_answers_on_year'
    add_index :answers, :row_id, name: 'index_answers_on_row_id'
  end
end
