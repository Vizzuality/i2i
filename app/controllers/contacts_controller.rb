# Controller for the email contacts
class ContactsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    throw downloads_params
    
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

  def batch_download
    if batch_download_params[:links].present?
      contact = Contact.new(email: batch_download_params[:email], country: batch_download_params[:country])
      
      if contact.save
        begin
          ContactMailer.data_batch_download(contact, batch_download_params[:links]).deliver!
        rescue SparkPostRails::DeliveryException => e
          Rails.logger.error "Error sending the email: #{e}"
        end
    
        render json: contact.to_json, status: :created
      else
        render json: contact.errors, status: :unprocessable_entity
      end
    else
      render json: :error, status: :unprocessable_entity
    end
  end
  
  private

  def contact_params
    params.permit(:email, :country, :year)
  end
  
  def batch_download_params
    params.permit(:email, :country, :terms, links: [])
  end
end
