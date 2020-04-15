class AddSectionFlagsToCountries < ActiveRecord::Migration[5.2]
  def change
    add_column :countries, :has_national_diaries, :boolean, default: false
    add_column :countries, :has_msme, :boolean, default: false
    add_column :countries, :has_finscope, :boolean, default: false
  end
end
