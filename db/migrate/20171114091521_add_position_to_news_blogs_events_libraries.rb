class AddPositionToNewsBlogsEventsLibraries < ActiveRecord::Migration[5.0]
  def change
    add_column :news, :position, :integer
    add_column :libraries, :position, :integer
    add_column :events, :position, :integer
    add_column :blogs, :position, :integer
  end
end
