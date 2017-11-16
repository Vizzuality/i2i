class AddDescriptionToLibraries < ActiveRecord::Migration[5.0]
  def change
    add_column :libraries, :description, :text
  end
end
