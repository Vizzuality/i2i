class AddIndexesToHouseholdTransactionHistories < ActiveRecord::Migration[5.0]
  def change
    add_index(:household_transaction_histories, :year)
    add_index(:household_transaction_histories, :month)
  end
end
