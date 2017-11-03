class AddTotalIncomeValueToHouseholdTransactions < ActiveRecord::Migration[5.0]
  def change
    add_column :household_transactions, :total_income, :float
  end
end
