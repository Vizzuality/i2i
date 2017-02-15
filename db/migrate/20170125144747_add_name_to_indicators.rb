class AddNameToIndicators < ActiveRecord::Migration[5.0]
  def change
    add_column :indicators, :name, :string
  end
end
