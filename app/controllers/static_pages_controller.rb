class StaticPagesController < ApplicationController

  def about
    @teamMembers = Member.where(role: 1);
    @advisoryMembers = Member.where(role: 2);

    gon.team = @teamMembers;
    gon.advisor = @advisoryMembers;
  end
end
