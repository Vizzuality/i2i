class AddSlugs < ActiveRecord::Migration[5.0]
  def change
    add_column :blogs, :slug, :string
    add_column :news, :slug, :string
    add_column :libraries, :slug, :string
    add_column :events, :slug, :string
  end
end
