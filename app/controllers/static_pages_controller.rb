class StaticPagesController < ApplicationController

  def about
    @teamMembers = Member.where(role: 1)
    @advisoryMembers = Member.where(role: 2)

    gon.team = JSON.parse serialized(@teamMembers).to_json
    gon.advisor = JSON.parse serialized(@advisoryMembers).to_json
  end

  def terms_of_use

  end

  private

    def serialized(model)
      ActiveModelSerializers::SerializableResource.new(model, adapter: :json)
    end

end
