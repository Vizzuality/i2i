class AddCustomAuthorToBlog < ActiveRecord::Migration[5.0]
  def change
    add_column :blogs, :custom_author, :string
  end
end
