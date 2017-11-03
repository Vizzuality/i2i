class AddCompoundIndexesToHouseholdTransactionHistories < ActiveRecord::Migration[5.0]
  def change
    add_index(:household_transaction_histories, [:month, :year])
    add_index(:household_transaction_histories, [:household_transaction_id, :month, :year], name: "index_household_histories_on_household_id_month_year")
  end
end
