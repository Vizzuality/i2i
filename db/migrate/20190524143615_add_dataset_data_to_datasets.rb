class AddDatasetDataToDatasets < ActiveRecord::Migration[5.0]
  def change
    add_column :datasets, :file_data, :text
  end
end
