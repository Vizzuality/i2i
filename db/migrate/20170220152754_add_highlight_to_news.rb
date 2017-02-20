class AddHighlightToNews < ActiveRecord::Migration[5.0]
  def change
    add_column :news, :highlight, :boolean
  end
end
