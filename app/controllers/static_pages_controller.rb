class StaticPagesController < ApplicationController

  def about
    @teamMembers = Member.where(role: 1)
    @advisoryMembers = Member.where(role: 2)

    gon.team = serialized(@teamMembers).to_json
    gon.advisor = serialized(@advisoryMembers).to_json
  end

  private

    def serialized(model)
      ActiveModelSerializers::SerializableResource.new(model, adapter: :json)
    end

end
