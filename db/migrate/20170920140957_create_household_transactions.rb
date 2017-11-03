class CreateHouseholdTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :household_transactions do |t|
      t.string :project_name
      t.string :household_name
      t.string :category_type
      t.string :category_name
      t.string :subcategory
      t.integer :num_accounts
      t.integer :num_members
      t.integer :num_adults

      t.timestamps
    end
  end
end
