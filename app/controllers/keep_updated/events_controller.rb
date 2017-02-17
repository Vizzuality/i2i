class KeepUpdated::EventsController < ApplicationController
  # before_action :set_news, only: [:show, :edit, :update, :destroy]

  def index
    @events = Event.all
  end

  def show
    @event = Event.find(params[:id])
  end

end
