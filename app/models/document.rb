# == Schema Information
#
# Table name: documents
#
#  id                :integer          not null, primary key
#  name              :string
#  file_file_name    :string
#  file_content_type :string
#  file_file_size    :integer
#  file_updated_at   :datetime
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Document < ApplicationRecord
	attr_accessor :document_file_name

	has_many :documented_items, :dependent => :destroy
	has_many :libraries, :through => :documented_items, :source => :documentable, :source_type => 'Library'

	has_attached_file :file
	validates_attachment :file, content_type: { content_type: "application/pdf" }
end
