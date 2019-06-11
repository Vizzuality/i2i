class AddStatusToDatasets < ActiveRecord::Migration[5.0]
  def change
    add_column :datasets, :status, :integer, null: false, default: 0
  end
end
