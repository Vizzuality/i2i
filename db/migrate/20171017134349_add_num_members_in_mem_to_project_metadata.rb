class AddNumMembersInMemToProjectMetadata < ActiveRecord::Migration[5.0]
  def change
    add_column :project_metadata, :num_members_in_mem, :integer
  end
end
