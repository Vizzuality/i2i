class RemoveHighlightFromNews < ActiveRecord::Migration[5.0]
  def change
    remove_column :news, :highlight, :boolean
  end
end
