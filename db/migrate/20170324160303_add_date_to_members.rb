class AddDateToMembers < ActiveRecord::Migration[5.0]
  def change
    add_column :members, :date, :date
  end
end
