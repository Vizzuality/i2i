class AddDateToHouseholdTransactionHistory < ActiveRecord::Migration[5.0]
  def change
    add_column :household_transaction_histories, :date, :datetime
  end
end
