# Controller for the email contacts
class ContactsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    contact = Contact.new(contact_params)
    if contact.save
      begin
        ContactMailer.data_mail(contact).deliver!
      rescue SparkPostRails::DeliveryException => e
        Rails.logger.error "Error sending the email: #{e}"
      end


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
