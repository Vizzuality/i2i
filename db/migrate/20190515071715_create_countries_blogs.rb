class CreateCountriesBlogs < ActiveRecord::Migration[5.0]
  def change
    create_table :countries_blogs do |t|
      t.references :country
      t.references :blog

      t.timestamps
    end
  end
end
