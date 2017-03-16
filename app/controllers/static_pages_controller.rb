class StaticPagesController < ApplicationController

  def about
    @teamMembers = Member.where(role: 1);
    @advisoryMembers = Member.where(role: 2);
  end
end
