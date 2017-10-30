class CreateHouseholdSubcategoryIncomes < ActiveRecord::Migration[5.0]
  def change
    create_table :household_subcategory_incomes do |t|
      t.string :project_name
      t.string :household_name
      t.float :value
      t.string :subcategory

      t.timestamps
    end
  end
end
