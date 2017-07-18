class AddPublishedToLibrary < ActiveRecord::Migration[5.0]
  def change
    add_column :libraries, :published, :boolean
  end
end
