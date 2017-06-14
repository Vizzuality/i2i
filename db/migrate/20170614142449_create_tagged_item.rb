class CreateTaggedItem < ActiveRecord::Migration[5.0]
  def change
    create_table :tagged_items do |t|
    	t.references :taggable, polymorphic: true, index: true
    	t.references :tag

    	t.timestamps
    end

    add_index :tagged_items, [:tag_id, :taggable_id, :taggable_type], :unique => true
  end
end
