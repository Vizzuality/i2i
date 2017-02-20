class AddNewFieldsToLibrary < ActiveRecord::Migration[5.0]
  def change
    add_column :libraries, :url_resource, :string
    add_column :libraries, :video_url, :string
  end
end
