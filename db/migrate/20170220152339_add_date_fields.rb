class AddDateFields < ActiveRecord::Migration[5.0]
  def change
    add_column :blogs,      :date, :timestamp
    add_column :events,     :date, :timestamp
    add_column :indicators, :date, :timestamp
    add_column :libraries,  :date, :timestamp
    add_column :news,       :date, :timestamp
  end
end
