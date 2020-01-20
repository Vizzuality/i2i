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

  def ns_download_all
    contact = Contact.new(ns_download_all_params)

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

  def about_form
    @contact = Contact.new(contact_params)

    respond_to do |format|
      if verify_human && @contact.save
        begin
          ContactMailer.message_mail(@contact).deliver!
        rescue SparkPostRails::DeliveryException => e
          Rails.logger.error "Error sending the email: #{e}"
        end

        format.json { render @contact, status: :created }
        format.js { render partial: 'static_pages/contact_form_messages', locals: { success: true } }
        format.html { redirect_to(about_path, notice: 'Success') }
      else
        format.json { render @contact.errors, status: :unprocessable_entity }
        format.js { render partial: 'static_pages/contact_form_messages', locals: { errors: @contact.errors } }
        format.html { redirect_to(about_path, alert: 'Error') }
      end
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
    params.require(:contact).permit(:first_name, :last_name, :email, :title, :company, :country, :message, :year)
  end

  def batch_download_params
    params.permit(:email, :country, :terms, links: [])
  end

  def ns_download_all_params
    params.permit(:email, :country, :terms, links: [])
  end

  def verify_human
    if Rails.env == 'production'
      verify_recaptcha(model: @contact)
    else
      true
    end
  end
end
