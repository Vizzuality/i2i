class RemoveContentFromLibraries < ActiveRecord::Migration[5.0]
  def change
    remove_column :libraries, :content
  end
end
