ActiveAdmin.register Contact do
  menu parent: 'Users', priority: 3

  actions :index
  config.per_page = 20
  config.sort_order = 'date_desc'

  index do
    selectable_column
    column :email
    column :country
    column :year
    column :created_at
  end

end
