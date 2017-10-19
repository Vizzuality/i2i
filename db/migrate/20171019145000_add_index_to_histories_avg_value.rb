class AddIndexToHistoriesAvgValue < ActiveRecord::Migration[5.0]
  def change
    add_index :household_transaction_histories, :avg_value
    add_index :household_member_transaction_histories, :avg_value
  end
end
