class AddSubcategoryToLibraries < ActiveRecord::Migration[5.0]
  def change
    add_reference :libraries, :subcategory, foreign_key: true
  end
end
