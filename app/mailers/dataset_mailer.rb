class DatasetMailer < ApplicationMailer
  def dataset_created_notification(dataset_id)
    dataset = Dataset.includes(:user, :country).find(dataset_id)
    
    @name = dataset.name
    @country = dataset.country.name
    @attribution = dataset.user.attribution || dataset.user.name_or_email
    @url = admin_dataset_url(dataset,
                             protocol: Rails.env.production? ? 'https' : nil,
                             host: ActionMailer::Base.default_url_options[:host],
                             port: Rails.env.production? ? nil : ActionMailer::Base.default_url_options[:port])
    
    substitution_data = {
      name: @name,
      country: @country,
      attribution: @attribution,
      url: @url
    }
    
    data = { template_id: 'new-dataset-created', substitution_data: substitution_data }
    mail(to: ENV.fetch('I2I_MAIL'), sparkpost_data: data)
  end
end
