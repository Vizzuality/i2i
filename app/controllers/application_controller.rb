class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def entities
    [News, Event, Library, Blog]
  end

  def meta(records)
    {
      current_page: records.current_page,
      total_pages: records.total_pages,
      total_count: records.total_count
    }
  end

  protected

  def after_sign_in_path_for(resource)
    redirect_path_for_resource(resource)
  end

  def after_sign_up_path_for(resource)
    redirect_path_for_resource(resource)
  end

  def after_update_path_for(resource)
    redirect_path_for_resource(resource)
  end

  def after_resetting_password_path_for(resource)
    redirect_path_for_resource(resource)
  end
  
  private
  
  def redirect_path_for_resource(resource)
    case resource
      when AdminUser then admin_root_path
      when User then account_path
    end
  end
end
