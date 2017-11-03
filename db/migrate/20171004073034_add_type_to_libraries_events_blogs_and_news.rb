class AddTypeToLibrariesEventsBlogsAndNews < ActiveRecord::Migration[5.0]
  def change
    add_column :libraries, :type, :string, default: 'library'
    add_column :events, :type, :string, default: 'event'
    add_column :blogs, :type, :string, default: 'blog'
    add_column :news, :type, :string, default: 'news'
  end
end
