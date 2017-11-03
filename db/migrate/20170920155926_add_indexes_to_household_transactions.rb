class AddIndexesToHouseholdTransactions < ActiveRecord::Migration[5.0]
  def change
    add_index(:household_transactions, :category_type)
    add_index(:household_transactions, :category_name)
    add_index(:household_transactions, :subcategory)
  end
end
