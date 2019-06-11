class AddNameSurnameInstitutionPositionCityCountryAttributionToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :surname, :string
    add_column :users, :company, :string
    add_column :users, :position, :string
    add_column :users, :city, :string
    add_column :users, :country, :string
    add_column :users, :attribution, :string
  end
end
