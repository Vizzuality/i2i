class CreateHouseholdMemberTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :household_member_transactions do |t|
      t.string :project_name
      t.string :household_name
      t.string :person_code
      t.string :gender
      t.string :relationship_to_head
      t.string :employed
      t.string :status
      t.string :category_type
      t.string :category_name
      t.string :subcategory
      t.integer :age
      t.integer :num_accounts

      t.timestamps
    end
  end
end
