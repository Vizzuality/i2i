class CreateHouseholdIncomeTiers < ActiveRecord::Migration[5.0]
  def change
    create_table :household_income_tiers do |t|
      t.float :min
      t.float :max
      t.integer :count
      t.integer :ntile
      t.string :project_name

      t.timestamps
    end
  end
end
