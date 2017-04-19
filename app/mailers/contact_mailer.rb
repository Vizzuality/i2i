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
end
