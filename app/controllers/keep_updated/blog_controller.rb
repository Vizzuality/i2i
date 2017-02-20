class KeepUpdated::BlogController < ApplicationController
  # before_action :set_news, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Blog.all
  end

  def show
    @post = Blog.find(params[:id])
  end

end
