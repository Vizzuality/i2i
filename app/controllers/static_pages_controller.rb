class StaticPagesController < ApplicationController

  def about
    @teamMembers = sort_by_importance(Member.where(role: 1))
    @advisoryMembers = sort_by_importance(Member.where(role: 2))
    @countries = [
      { iso: 'BGD', name: 'Bangladesh' },
      { iso: 'GHA', name: 'Ghana' },
      { iso: 'IND', name: 'India' },
      { iso: 'IDN', name: 'Indonesia' },
      { iso: 'KEN', name: 'Kenya' },
      { iso: 'MOZ', name: 'Mozambique' },
      { iso: 'NGA', name: 'Nigeria' },
      { iso: 'PAK', name: 'Pakistan' },
      { iso: 'RWA', name: 'Rwanda' },
      { iso: 'SEN', name: 'Senegal' },
      { iso: 'TZA', name: 'Tanzania' },
      { iso: 'UGA', name: 'Uganda' },
      { iso: 'ZMB', name: 'Zambia' },
    ]

    gon.team = JSON.parse @teamMembers.to_json
    gon.advisor = JSON.parse @advisoryMembers.to_json
  end

  def email
    email = params.require(:email).permit(:name, :email, :subject)
    if valid_email_contact? email
      begin
        ContactMailer.message_mail(email.to_h).deliver!
      rescue SparkPostRails::DeliveryException => e
        Rails.logger.error "Error sending the email: #{e}"
      end

      render json: email.to_json, status: :created
    else
      render json: email.errors, status: :unprocessable_entity
    end
  end

  def terms_of_use; end

  def privacy_policy; end

  private

  def serialized(model)
    ActiveModelSerializers::SerializableResource.new(model, adapter: :json)
  end

  def sort_by_importance(members)
    members.sort_by { |member| [member.order ? 0 : 1, member.order] }
  end

  def valid_email_contact?(email)
    return false unless email.key?(:name) && email.key?(:email) && email.key?(:subject)
    !email[:name].blank? && !email[:email].blank? && !email[:subject].blank?
  end
end
