class ContactMailer < ApplicationMailer
  default from: 'data@i2i.com'

  def data_mail(contact)
    mail(to: contact.email,
         subject: "Data for #{contact.country} in #{contact.year}")
  end
end
