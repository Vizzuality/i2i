ActiveAdmin.register User do
  menu parent: 'Users', priority: 4
  permit_params :email, :name, :password, :password_confirmation
  
  controller do
    def update
      if params[:user][:password].blank?
        params[:user].delete('password')
        params[:user].delete('password_confirmation')
      end
  
      super
    end
  end
  
  index do
    selectable_column
    id_column
    column :name
    column :email
    column :created_at
    actions
  end
  
  filter :email
  filter :created_at
  
  form do |f|
    f.inputs "Admin Details" do
      f.input :name
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

end
