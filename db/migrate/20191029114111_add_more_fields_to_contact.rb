class AddMoreFieldsToContact < ActiveRecord::Migration[5.2]
  def change
    add_column :contacts, :first_name, :string
    add_column :contacts, :last_name, :string
    add_column :contacts, :title, :string
    add_column :contacts, :company, :string
    add_column :contacts, :message, :text
  end
end
