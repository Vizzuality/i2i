ActiveAdmin.register ProjectMetadatum do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end
  permit_params :project_name,
    :name,
    :country_iso2,
    :country_iso3,
    :currency_singular,
    :currency_plural,
    :currency_code,
    :currency_symbol,
    :num_households_in_hh,
    :num_households_in_mem,
    :member_level_interviews,
    :start_date,
    :end_date,
    :created_at,
    :updated_at,
    :num_members_in_mem,
    :province,
    :custom_text

  index do
    selectable_column
    column :project_name
    column :name
    column :country_iso3
    column :start_date
    column :end_date
    column :updated_at
    column :created_at
    actions
  end

end
