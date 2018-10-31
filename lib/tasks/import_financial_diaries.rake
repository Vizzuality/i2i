require 'csv'

namespace :db do
  desc 'Import household transactions from CSV'
  task import_household_transactions: :environment do
    p "started at #{DateTime.now}"
    csv_text = File.read('db/data/household_transactions.csv')
    csv = CSV.parse(csv_text, :headers => true)
    households = []
    date_headers = csv.headers[10..74]

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
      row[10..74].each_with_index do |value, date_index|
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
    date_headers = csv.headers[14..78]

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
      row[14..78].each_with_index do |value, date_index|
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

  task create_histories_values: :environment do
    histories = HouseholdTransactionHistory.where.not(value: nil)

    histories.each do |history|
      values = history.value.split(':').map { |val| val.eql?("null") ? nil : val.to_f }
      history.update_columns(
        total_transaction_value: values[0],
        avg_value: values[1],
        min_value: values[2],
        max_value: values[3],
        rolling_balance: values[4],
        business_expenses: values[5],
        withdrawals: values[6],
        deposits: values[7],
        new_borrowing: values[8],
        repayment: values[9]
      )
    end
  end

  task create_member_histories_values: :environment do
    histories = HouseholdMemberTransactionHistory.where.not(value: nil)

    histories.each do |history|
      values = history.value.split(':').map { |val| val.eql?("null") ? nil : val.to_f }
      history.update_columns(
        total_transaction_value: values[0],
        avg_value: values[1],
        min_value: values[2],
        max_value: values[3],
        rolling_balance: values[4],
        business_expenses: values[5],
        withdrawals: values[6],
        deposits: values[7],
        new_borrowing: values[8],
        repayment: values[9]
      )
    end
  end

  task calculate_household_subcategory_income: :environment do
    transactions = HouseholdTransaction.where(category_type: 'income').where.not(subcategory: 'Resources').where.not(subcategory: nil)

    transactions.each do |transaction|
      income = HouseholdSubcategoryIncome.find_or_create_by(project_name: transaction.project_name,
                                                   household_name: transaction.household_name,
                                                   subcategory: transaction.subcategory)

      project_metadata = ProjectMetadatum.find_by(project_name: transaction.project_name)
      total_income = transaction.household_transaction_histories.where(date: project_metadata.start_date..project_metadata.end_date).pluck(:total_transaction_value).compact.reduce(:+)
      income.value = income.value.to_f + total_income.to_f
      income.save
    end
  end

  task calculate_member_subcategory_income: :environment do
    transactions = HouseholdMemberTransaction.where(category_type: 'income').where.not(subcategory: 'Resources').where.not(subcategory: nil)

    transactions.each do |transaction|
      income = MemberSubcategoryIncome.find_or_create_by(project_name: transaction.project_name,
                                                         household_name: transaction.household_name,
                                                         subcategory: transaction.subcategory,
                                                         person_code: transaction.person_code)

      project_metadata = ProjectMetadatum.find_by(project_name: transaction.project_name)
      total_income = transaction.household_member_transaction_histories.where(date: project_metadata.start_date..project_metadata.end_date).pluck(:total_transaction_value).compact.reduce(:+)
      income.value = income.value.to_f + total_income.to_f
      income.save
    end
  end

  task add_dates_to_histories: :environment do
    dates = HouseholdTransactionHistory.all.pluck(:month, :year).uniq
    dates.each do |date|
      HouseholdTransactionHistory.where(month: date[0], year: date[1]).update_all(date: "#{date[1]}-#{date[0].to_s.rjust(2, '0')}-01")
    end

    dates = HouseholdMemberTransactionHistory.all.pluck(:month, :year).uniq
    dates.each do |date|
      HouseholdMemberTransactionHistory.where(month: date[0], year: date[1]).update_all(date: "#{date[1]}-#{date[0].to_s.rjust(2, '0')}-01")
    end
  end

  task create_household_income_tiers: :environment do
    tables = ActiveRecord::Base.connection.execute('with s as (Select sum(value) as value, project_name, household_name   from  household_subcategory_incomes group by project_name, household_name),
                                                    r as (Select ntile(4)  over ( partition by project_name ORDER BY value asc), value,   project_name from  s)
                                                    select min(value), max(value), count(value), ntile, project_name from r group by ntile, project_name order by project_name, ntile;')

    tables.values.each do |table|
      HouseholdIncomeTier.find_or_create_by(
        min: table[0],
        max: table[1],
        count: table[2],
        ntile: table[3],
        project_name: table[4]
      )
    end
  end

  task create_member_income_tiers: :environment do
    tables = ActiveRecord::Base.connection.execute('with s as (Select sum(value) as value, project_name, household_name   from  member_subcategory_incomes group by project_name, household_name),
                                                    r as (Select ntile(4)  over ( partition by project_name ORDER BY value asc), value,   project_name from  s)
                                                    select min(value), max(value), count(value), ntile, project_name from r group by ntile, project_name order by project_name, ntile;')

    tables.values.each do |table|
      MemberIncomeTier.find_or_create_by(
        min: table[0],
        max: table[1],
        count: table[2],
        ntile: table[3],
        project_name: table[4]
      )
    end
  end

  task calculate_household_transaction_total_income: :environment do
    transactions = HouseholdTransaction.where(category_type: 'income', category_name: 'ALL')

    transactions.each do |transaction|
      incomes = HouseholdSubcategoryIncome.where(household_name: transaction.household_name,
                                                 project_name: transaction.project_name)
      transaction.update_column(:total_income, incomes.pluck(:value).reduce(:+))
    end
  end

  task calculate_household_member_transaction_total_income: :environment do
    transactions = HouseholdMemberTransaction.where(category_type: 'income', category_name: 'ALL')

    transactions.each do |transaction|
      incomes = MemberSubcategoryIncome.where(household_name: transaction.household_name,
                                              project_name: transaction.project_name,
                                              person_code: transaction.person_code)
      transaction.update_column(:total_income, incomes.pluck(:value).reduce(:+))
    end
  end

  # task remove_resources_from_income: :environment do
  #   households = HouseholdTransaction.where(category_type: 'income', subcategory: 'Resources')
  #   members = HouseholdMemberTransaction.where(category_type: 'income', subcategory: 'Resources')

  #   households.each(&:destroy)
  #   members.each(&:destroy)
  # end

  # task change_credits_to_credit: :environment do
  #   HouseholdTransaction.where(category_type: 'credits').update_all(category_type: 'credit')
  #   HouseholdMemberTransaction.where(category_type: 'credits').update_all(category_type: 'credit')
  # end

  # This is used to narrow down the number of subcategories present in records of category_type expense
  # task update_expenses_subcategories: :environment do
  #   households = HouseholdTransaction.where.not(category_name: 'ALL').where(category_type: 'expense')
  #   members = HouseholdMemberTransaction.where.not(category_name: 'ALL').where(category_type: 'expense')
  #   usage = CategoryUsage.where(category_type: 'expense')
  #   p 'Starting update'

  #   ActiveRecord::Base.transaction do
  #     households.each do |household|
  #       household.subcategory = household.category_name
  #       household.save
  #     end
  #     p 'Household Transactions queued'

  #     members.each do |member|
  #       member.subcategory = member.category_name
  #       member.save
  #     end

  #     usage.each do |cat|
  #       cat.subcategory = cat.category_name
  #       cat.save
  #     end

  #     p 'Household Member Transactions queued'
  #   end
  #   p 'Saved'
  # end

  # task remove_unwanted_categories: :environment do
  #   hh = HouseholdTransaction.where(category_type: nil)
  #   hh_histories = HouseholdTransactionHistory.where(household_transaction_id: hh.pluck(:id))
  #   hm = HouseholdMemberTransaction.where(category_type: nil)
  #   hm_histories = HouseholdMemberTransactionHistory.where(household_member_transaction_id: hm.pluck(:id))
  #   hh_insurance = HouseholdTransaction.where(category_type: 'insurance')
  #   hh_insurance_histories = HouseholdTransactionHistory.where(household_transaction_id: hh_insurance.pluck(:id))
  #   hm_insurance = HouseholdMemberTransaction.where(category_type: 'insurance')
  #   hm_insurance_histories = HouseholdMemberTransactionHistory.where(household_member_transaction_id: hm_insurance.pluck(:id))

  #   hh.each(&:destroy)
  #   hh_histories.each(&:destroy)
  #   hm.each(&:destroy)
  #   hm_histories.each(&:destroy)
  #   hh_insurance.each(&:destroy)
  #   hh_insurance_histories.each(&:destroy)
  #   hm_insurance.each(&:destroy)
  #   hm_insurance_histories.each(&:destroy)
  # end

  # task update_project_start_and_end_date: :environment do
  #   dates = [
  #     ['India Financial Diaries', '2013-02-01', '2013-06-01'],
  #     ['Kenya Financial Diaries', '2012-10-01', '2013-08-01'],
  #     ['Smallholders Mozambique', '2014-07-01', '2015-06-01'],
  #     ['Smallholders Pakistan', '2014-07-01', '2015-06-01'],
  #     ['Smallholders Tanzania', '2014-07-01', '2015-05-01'],
  #     ['South Africa GAFIS', '2012-12-01', '2013-06-01'],
  #     ['Mexico Financial Diaries', '2014-04-01', '2014-11-01']
  #   ]

  #   dates.each do |info|
  #     project = ProjectMetadatum.find_by(project_name: info[0])
  #     project.start_date = info[1]
  #     project.end_date = info[2]
  #     project.save
  #   end
  # end

  # task update_currency_symbols: :environment do
  #   values = [
  #     ['India Financial Diaries', '₹'],
  #     ['Kenya Financial Diaries', 'KSh'],
  #     ['Mexico Financial Diaries', 'Mex$'],
  #     ['Smallholders Mozambique', 'MT'],
  #     ['Smallholders Pakistan', 'Rs'],
  #     ['Smallholders Tanzania', 'TSh'],
  #     ['South Africa GAFIS', 'R']
  #   ]

  #   values.each do |value|
  #     ProjectMetadatum.find_by(project_name: value[0]).update_column(:currency_symbol, value[1])
  #   end
  # end

  # task add_province_to_project_metadata: :environment do
  #   provinces = [
  #     ['Mexico', 'Puebla and Oaxaca states, and Mexico City outskirt'],
  #     ['Kenya', 'Nairobi, Makueni, Mombasa, Eldoret, Vihiga'],
  #     ['Pakistan', 'Two villages, Bahawalnagar district, in the south of the Punjab province'],
  #     ['Tanzania', 'Two villages in Mbeya'],
  #     ['India', 'Varanasi and outskirts, Uttar Pradesh province'],
  #     ['Mozambique', 'Three villages in Rapale district, northern Nampula province']
  #   ]

  #   provinces.each do |province|
  #     ProjectMetadatum.find_by(name: province[0]).update_column(:province, province[1])
  #   end
  # end

  # task create_missing_countries: :environment do
  #   countries = [
  #     ['Mexico', 'MEX'],
  #     ['South Africa', 'ZAF'],
  #     ['Botswana', 'BWA'],
  #     ['Mauritius', 'MUS'],
  #     ['Malawi', 'MWI'],
  #     ['Namibia', 'NAM'],
  #     ['Seychelles', 'SYC']
  #   ]

  #   countries.each do |country|
  #     Country.find_or_create_by(name: country[0], iso: country[1])
  #   end
  # end
end
