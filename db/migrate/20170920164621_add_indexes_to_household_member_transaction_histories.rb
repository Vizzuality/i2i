class AddIndexesToHouseholdMemberTransactionHistories < ActiveRecord::Migration[5.0]
  def change
    add_index(:household_member_transaction_histories, :year)
    add_index(:household_member_transaction_histories, :month)
    add_index(:household_member_transaction_histories, [:month, :year])
    add_index(:household_member_transaction_histories, [:household_member_transaction_id, :month, :year], name: "index_household_member_histories_on_member_id_month_year")
  end
end
