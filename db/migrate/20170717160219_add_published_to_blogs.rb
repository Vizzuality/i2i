class AddPublishedToBlogs < ActiveRecord::Migration[5.0]
  def change
    add_column :blogs, :published, :boolean
  end
end
