class RenameTypeOnLibrariesEventsBlogsAndNews < ActiveRecord::Migration[5.0]
  def change
    rename_column :libraries, :type, :record_type
    rename_column :events, :type, :record_type
    rename_column :blogs, :type, :record_type
    rename_column :news, :type, :record_type
  end
end
