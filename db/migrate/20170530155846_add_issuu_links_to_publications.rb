class AddIssuuLinksToPublications < ActiveRecord::Migration[5.0]
  def change
    add_column :blogs, :issuu_link, :string
    add_column :news, :issuu_link, :string
    add_column :libraries, :issuu_link, :string
  end
end
