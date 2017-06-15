class AddOrderToMembers < ActiveRecord::Migration[5.0]
  def change
  	add_column :members, :order, :integer
  end
end
