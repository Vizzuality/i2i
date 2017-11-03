class AddFeaturedFieldsToTags < ActiveRecord::Migration[5.0]
  def change
    add_column :tags, :is_featured, :boolean, default: false
    add_column :tags, :description, :text
    add_column :tags, :image_url, :string
  end
end
