class AddWebsiteUrlToPartners < ActiveRecord::Migration[5.0]
  def change
    add_column :partners, :website_url, :string
  end
end
