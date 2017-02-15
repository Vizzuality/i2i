class ChangeLibraryTypeToString < ActiveRecord::Migration[5.0]
  def up
    change_column :libraries, :type, :string
    rename_column :libraries, :type, :content_type
  end

  def down
    rename_column :libraries, :content_type, :type
    change_column :libraries, :type, 'integer USING CAST (type as integer)'
  end
end
