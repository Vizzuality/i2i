class AddDataToNews < ActiveRecord::Migration[5.0]
  def change
    add_column :news, :title, :string
    add_column :news, :summary, :text
    add_column :news, :content, :text
    add_attachment :news, :image
  end
end
