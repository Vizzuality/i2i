class KeepUpdated::NewsController < ApplicationController
  # before_action :set_news, only: [:show, :edit, :update, :destroy]

  def index
    @news = News.all
  end

  def show
    @news = News.find(params[:id])
  end

end
