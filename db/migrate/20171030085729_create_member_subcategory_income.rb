class CreateMemberSubcategoryIncome < ActiveRecord::Migration[5.0]
  def change
    create_table :member_subcategory_incomes do |t|
      t.string :project_name
      t.string :household_name
      t.string :person_code
      t.float :value
      t.string :subcategory

      t.timestamps
    end
  end
end
