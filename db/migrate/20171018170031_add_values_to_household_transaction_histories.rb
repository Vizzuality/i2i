class AddValuesToHouseholdTransactionHistories < ActiveRecord::Migration[5.0]
  def change
    add_column :household_transaction_histories, :total_transaction_value, :float
    add_column :household_transaction_histories, :avg_value, :float
    add_column :household_transaction_histories, :min_value, :float
    add_column :household_transaction_histories, :max_value, :float
    add_column :household_transaction_histories, :rolling_balance, :float
    add_column :household_transaction_histories, :business_expenses, :float
    add_column :household_transaction_histories, :withdrawals, :float
    add_column :household_transaction_histories, :deposits, :float
    add_column :household_transaction_histories, :new_borrowing, :float
    add_column :household_transaction_histories, :repayment, :float
  end
end
