class AddWorkstreamToBlogs < ActiveRecord::Migration[5.0]
  def change
    add_column :blogs, :workstream, :string
  end
end
