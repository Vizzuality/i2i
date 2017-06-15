class CreateDocumentedItem < ActiveRecord::Migration[5.0]
  def change
    create_table :documented_items do |t|
    	t.references :documentable, polymorphic: true, index: true
    	t.references :document

    	t.timestamps
    end

    add_index :documented_items, [:document_id, :documentable_id, :documentable_type], :unique => true, :name => 'documentable_index'
  end
end
