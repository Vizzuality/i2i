class AddIsFeaturedToEntities < ActiveRecord::Migration[5.0]
  def change
    add_column :blogs, :is_featured, :boolean, default: false
    add_column :events, :is_featured, :boolean, default: false
    add_column :libraries, :is_featured, :boolean, default: false
    add_column :news, :is_featured, :boolean, default: false
  end
end
