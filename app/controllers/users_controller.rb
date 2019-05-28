class UsersController < ApplicationController
  before_action :authenticate_user!

  def edit
    @user = current_user
  end

  def update
    if current_user.update(user_params)
      redirect_to account_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :surname, :email, :company, :position, :city, :country, :attribution)
  end
end
