ActiveAdmin.register User do
  menu parent: 'Users', priority: 4
  permit_params :email,
                :name,
                :password,
                :password_confirmation,
                :surname,
                :company,
                :position,
                :city,
                :country,
                :attribution
  
  controller do
    def update
      if params[:user][:password].blank?
        params[:user].delete('password')
        params[:user].delete('password_confirmation')
      end
  
      super
    end

    def destroy
      user = User.find(params[:id])
  
      if user.datasets.published.exists?
        DeleteUserDatasetsFromCarto.new(current_user.id).perform
      end
      
      super
    end
  end
  
  index do
    selectable_column
    id_column
    column :name
    column :surname
    column :company
    column :position
    column :city
    column :country
    column :attribution
    column :email
    column :created_at
    actions
  end
  
  filter :email
  filter :company
  filter :position
  filter :city
  filter :country
  filter :attribution
  filter :created_at
  
  form do |f|
    f.inputs "User Details" do
      f.input :name
      f.input :surname
      f.input :email
      f.input :password
      f.input :password_confirmation

      f.input :company
      f.input :position
      f.input :city
      f.input :country, as: :string
      f.input :attribution
    end
    f.actions
  end

end
