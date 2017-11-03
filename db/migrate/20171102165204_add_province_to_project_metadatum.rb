class AddProvinceToProjectMetadatum < ActiveRecord::Migration[5.0]
  def change
    add_column :project_metadata, :province, :string
  end
end
