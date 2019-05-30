class DeleteUserDatasetsFromCarto
  CARTODB_USERNAME = ENV['FSP_CARTO_ACCOUNT']
  
  # Move to ENV or change to production api_key
  CARTODB_API_KEY = 'gYzQoMKrOzgqk9jdnSp7FA'
  # Move to ENV or change to production table
  CARTODB_TABLE = 'fsp_maps_users_staging'
  
  attr_reader :user_id, :message
  
  def initialize(user_id)
    @user_id = user_id
  end
  
  def perform
    resp = HTTParty.post(api_url_with_key, body: { "q": delete_query })
    
    if resp["error"].present?
      @message = "Datasets were not deleted. Error message: #{resp['error']}."
      false
    else
      @message = "Datasets were deleted!"
    end
  end
  
  private
  
  def delete_query
    "DELETE FROM #{CARTODB_TABLE} WHERE #{CARTODB_TABLE}.user_id = #{user_id}"
  end
  
  def api_url_with_key
    "https://#{CARTODB_USERNAME}.carto.com/api/v2/sql?api_key=#{CARTODB_API_KEY}"
  end
end
