class AddTitleToTag < ActiveRecord::Migration[5.0]
  def change
    add_column :tags, :title, :string
  end
end
