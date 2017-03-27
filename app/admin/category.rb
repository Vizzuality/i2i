ActiveAdmin.register Category do
  menu parent: 'Settings', priority: 1
  controller do
    def permitted_params
      params.permit category: [:name, :description, :id]
    end
  end
end
