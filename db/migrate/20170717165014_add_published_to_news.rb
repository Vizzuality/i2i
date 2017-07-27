class AddPublishedToNews < ActiveRecord::Migration[5.0]
  def change
    add_column :news, :published, :boolean
  end
end
