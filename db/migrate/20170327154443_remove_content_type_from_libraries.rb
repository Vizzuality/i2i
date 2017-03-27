class RemoveContentTypeFromLibraries < ActiveRecord::Migration[5.0]
  def change
    remove_column :libraries, :content_type, :string
  end
end
