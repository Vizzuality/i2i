class AddAuthorToContents < ActiveRecord::Migration[5.0]
  def change
    add_column :news,   :author, :string
    add_column :blogs,  :author, :string
    add_column :events, :author, :string
  end
end
