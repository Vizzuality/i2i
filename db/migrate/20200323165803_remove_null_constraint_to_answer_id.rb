class RemoveNullConstraintToAnswerId < ActiveRecord::Migration[5.2]
  def up
    change_column :answers, :answer_id, :integer, null: true
    change_column :answer_regions, :answer_id, :integer, null: true
  end

  def down
    change_column :answers, :answer_id, :integer
    change_column :answer_regions, :answer_id, :integer
  end
end
