class AddCustomTextToFinancialDiaries < ActiveRecord::Migration[5.0]
  def change
    add_column :project_metadata, :custom_text, :text
  end
end
