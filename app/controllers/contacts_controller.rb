# Controller for the email contacts
class ContactsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    contact = Contact.new(contact_params)
    if contact.save
      ContactMailer.data_mail(contact).deliver_later

      render json: contact.to_json, status: :created
    else
      render json: contact.errors, status: :unprocessable_entity
    end
  end

  private

  def contact_params
    params.permit(:email, :country, :year)
  end
end
