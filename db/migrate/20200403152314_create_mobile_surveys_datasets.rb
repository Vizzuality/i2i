class CreateMobileSurveysDatasets < ActiveRecord::Migration[5.2]
  def change
    create_table :mobile_surveys_datasets do |t|
      t.integer :year
      t.text :iso_code
      t.text :filename

      t.timestamps
    end
  end
end
