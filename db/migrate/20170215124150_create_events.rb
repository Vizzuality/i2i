class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :title
      t.text :summary
      t.text :content
      t.attachment :image

      t.timestamps
    end
  end
end
