class StaticPagesController < ApplicationController

  def about
    @teamMembers = sort_members_by_surname(Member.where(role: 1))
    @advisoryMembers = sort_members_by_surname(Member.where(role: 2))
    @countries = Country.all.order('name')

    gon.team = JSON.parse serialized(@teamMembers).to_json
    gon.advisor = JSON.parse serialized(@advisoryMembers).to_json
  end

  def terms_of_use

  end

  private

    def serialized(model)
      ActiveModelSerializers::SerializableResource.new(model, adapter: :json)
    end

    # Temporary solution. It doesn't work with two-word names. Find a better solution.
    # Sorts members by surname.
    def sort_members_by_surname(members)
      members.sort{ |a, b| a.name.split(' ')[1] <=> b.name.split(' ')[1] }
    end
end
