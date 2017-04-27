class ContactMailer < ApplicationMailer

  def data_mail(contact)
    @contact = contact

    sub_data = { country: @contact.country,
                 year: @contact.year }

    data = { template_id: 'test',
             substitution_data: sub_data }

    mail(to: @contact.email,
         sparkpost_data: data)
  end

  def message_mail(message)
    data = { template_id: 'message', substitution_data: message }
    mail(to: ENV.fetch('I2I_MAIL'), sparkpost_data: data)
  end
end
