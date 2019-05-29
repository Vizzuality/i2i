class PublishDataset
  CARTODB_USERNAME = ENV['FSP_CARTO_ACCOUNT']
  
  # Move to ENV or change to production api_key
  CARTODB_API_KEY = 'rMATKa4Im_EYwITHeTCsWw'
  # Move to ENV or change to production table
  CARTODB_TABLE = 'fsp_maps_users_staging'
  
  CARTODB_TABLE_FIELDS = %w(country
                          field_1
                          sector
                          type
                          land_use
                          iso
                          lat
                          lng
                          year
                          name
                          color).freeze
  
  attr_reader :dataset, :message
  
  def initialize(dataset_id)
    @dataset = Dataset.includes(:country).find(dataset_id)
  end
  
  def perform
    resp = HTTParty.post(api_url_with_key, body: { "q": insert_query })
    
    if resp["error"].present?
      @message = "Database was not published. Error message: #{resp['error']}."
      false
    else
      @message = "Database was published! New records: #{resp['total_rows'] || 0}."
      dataset.published!
    end
  end
  
  private
  
  def dataset_file_rows
    rows = []
    
    country_name = dataset.country.name
    country_iso = dataset.country.iso
    sector = dataset.category&.capitalize

    # Expect to have grouped values for INSERT query:
    # ('Zambia',513386,'Finance','MFI',NULL,'ZMB',19.44840051,-72.6934262,2017,'Sogesol','#2ca02c')
    #
    CSV.foreach(file_path, headers: true) do |row|
      #
      # Order matters and should be the same as in CARTODB_TABLE_FIELDS
      #
      row_values = [
        "'#{country_name}'",
        row['field_1'].present? ? row['field_1'] : 'NULL',
        "'#{sector}'",
        row['type'].present? ? "'#{row['type']}'" : 'NULL',
        row['land_use'].present? ? "'#{row['land_use']}'" : 'NULL',
        "'#{country_iso}'",
        row['lat'].present? ? row['lat'] : 'NULL',
        row['lng'].present? ? row['lng'] : 'NULL',
        row['year'].present? ? row['year'] : 'NULL',
        row['name'].present? ? "'#{row['name']}'" : 'NULL',
        row['color'].present? ? "'#{row['color']}'" : 'NULL'
      ].join(',')
      
      rows << "(#{row_values})"
    end
    
    rows
  end
  
  def insert_query
    "INSERT INTO #{CARTODB_TABLE} (#{CARTODB_TABLE_FIELDS.join(',')}) VALUES #{dataset_file_rows.join(',')};"
  end
  
  def api_url_with_key
    "https://#{CARTODB_USERNAME}.carto.com/api/v2/sql?api_key=#{CARTODB_API_KEY}"
  end
  
  def file_path
    "public#{dataset.file_url}"
  end
end