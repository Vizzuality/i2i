class AddDateToHouseholdMemberTransactionHistory < ActiveRecord::Migration[5.0]
  def change
    add_column :household_member_transaction_histories, :date, :datetime
  end
end
