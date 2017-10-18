require 'csv'

namespace :db do
  desc 'Import household transactions from CSV'
  task import_household_transactions: :environment do
    p "started at #{DateTime.now}"
    csv_text = File.read('db/data/household_transactions.csv')
    csv = CSV.parse(csv_text, :headers => true)
    households = []
    date_headers = csv.headers[8..72]

    csv.each do |row|
      households << HouseholdTransaction.new(
        project_name: row["project_name"],
        household_name: row["household_name"],
        category_type: row["category_type"],
        category_name: row["category_name"],
        subcategory: row["subcategory"],
        num_accounts: row["num_accounts"],
        num_members: row["num_members"],
        num_adults: row["num_adults"]
      )
    end

    p "saving household transactions at #{DateTime.now}"
    household_ids = HouseholdTransaction.import(households).ids
    p "household transactions saved at #{DateTime.now}"

    csv.each_with_index do |row, index|
      household_histories = []
      row[8..72].each_with_index do |value, date_index|
        date = date_headers[date_index].split('-')
        year = date[0]
        month = date[1]

        household_histories << HouseholdTransactionHistory.new(
          household_transaction_id: household_ids[index],
          value: value,
          year: year,
          month: month
        )
      end

      HouseholdTransactionHistory.import(household_histories)
    end

    p "finished at #{DateTime.now}"
  end

  task import_household_member_transactions: :environment do
    p "started at #{DateTime.now}"
    csv_text = File.read('db/data/household_member_transactions.csv')
    csv = CSV.parse(csv_text, :headers => true)
    household_members = []
    date_headers = csv.headers[12..76]

    csv.each do |row|
      household_members << HouseholdMemberTransaction.new(
        project_name: row["project_name"],
        household_name: row["household_name"],
        person_code: row["person_code"],
        gender: row["gender"],
        relationship_to_head: row["relationship_to_head"],
        employed: row["employed"],
        status: row["status"],
        category_type: row["category_type"],
        category_name: row["category_name"],
        subcategory: row["subcategory"],
        age: row["age"],
        num_accounts: row["num_accounts"]
      )
    end

    p "saving household member transactions at #{DateTime.now}"
    household_member_ids = HouseholdMemberTransaction.import(household_members).ids
    p "household member transactions saved at #{DateTime.now}"

    csv.each_with_index do |row, index|
      household_member_histories = []
      row[12..76].each_with_index do |value, date_index|
        date = date_headers[date_index].split('-')
        year = date[0]
        month = date[1]

        household_member_histories << HouseholdMemberTransactionHistory.new(
          household_member_transaction_id: household_member_ids[index],
          value: value,
          year: year,
          month: month
        )
      end

      HouseholdMemberTransactionHistory.import(household_member_histories)
    end

    p "finished at #{DateTime.now}"
  end

  task import_project_metadata: :environment do
    csv_text = File.read('db/data/projects_meta_data.csv')
    csv = CSV.parse(csv_text, :headers => true)
    project_metadata = []
    csv.each do |row|
      project_metadata << ProjectMetadatum.new(
        project_name: row["project_name"],
        name: row["name"],
        country_iso2: row["country_iso2"],
        country_iso3: row["country_iso3"],
        currency_singular: row["currency_singular"],
        currency_plural: row["currency_plural"],
        currency_code: row["currency_code"],
        currency_symbol: row["currency_symbol"],
        num_households_in_hh: row["num_households_in_hh"],
        num_households_in_mem: row["num_households_in_mem"],
        num_members_in_mem: row["num_members_in_mem"],
        member_level_interviews: row["member_level_interviews"],
        start_date: row["start_date"],
        end_date: row["end_date"]
      )
    end

    ProjectMetadatum.import(project_metadata)
  end

  task import_category_usage: :environment do
    csv_text = File.read('db/data/category_statistics_and_usage.csv')
    csv = CSV.parse(csv_text, :headers => true)
    category_usages = []
    csv.each do |row|
      category_usages << CategoryUsage.new(
        category_type: row["category_type"],
        category_name: row["category_name"],
        subcategory: row["subcategory"],
        project_name: row["project_name"],
        num_rows: row["num_rows"],
        num_projects: row["num_projects"]
      )
    end

    CategoryUsage.import(category_usages)
  end
end
