class CreateLibrariesRegions < ActiveRecord::Migration[5.0]
  def change
    create_table :libraries_regions do |t|
      t.references :library
      t.references :region

      t.timestamps
    end
  end
end
