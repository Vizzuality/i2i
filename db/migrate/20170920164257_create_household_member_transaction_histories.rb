class CreateHouseholdMemberTransactionHistories < ActiveRecord::Migration[5.0]
  def change
    create_table :household_member_transaction_histories do |t|
      t.integer :household_member_transaction_id
      t.string :value
      t.integer :month
      t.integer :year

      t.timestamps
    end
  end
end
