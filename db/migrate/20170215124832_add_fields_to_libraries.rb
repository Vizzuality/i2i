class AddFieldsToLibraries < ActiveRecord::Migration[5.0]
  def change
    add_column :libraries, :title, :string
    add_column :libraries, :summary, :text
    add_column :libraries, :content, :text
    add_attachment :libraries, :image

    add_column :libraries, :type, :integer
  end
end
