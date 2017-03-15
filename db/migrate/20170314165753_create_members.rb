class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.string :name
      t.string :position
      t.string :organization_name
      t.text :biography
      t.string :role
      t.attachment :image
      t.string :slug

      t.timestamps
    end
  end
end
