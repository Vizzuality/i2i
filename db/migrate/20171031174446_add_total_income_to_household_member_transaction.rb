class AddTotalIncomeToHouseholdMemberTransaction < ActiveRecord::Migration[5.0]
  def change
    add_column :household_member_transactions, :total_income, :float
  end
end
