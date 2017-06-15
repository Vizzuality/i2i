# == Schema Information
#
# Table name: documented_items
#
#  id                :integer          not null, primary key
#  documentable_type :string
#  documentable_id   :integer
#  document_id       :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class DocumentedItem < ApplicationRecord
	belongs_to :documentable, :polymorphic => true
  belongs_to :document, :dependent => :destroy
end
