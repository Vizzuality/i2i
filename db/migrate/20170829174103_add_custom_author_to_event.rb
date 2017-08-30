class AddCustomAuthorToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :custom_author, :string
  end
end
