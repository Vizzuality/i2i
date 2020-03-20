# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_20_164718) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", id: :serial, force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_id", null: false
    t.string "resource_type", null: false
    t.string "author_type"
    t.integer "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "answer_regions", force: :cascade do |t|
    t.integer "row_id", null: false
    t.integer "indicator_id", null: false
    t.integer "child_indicator_id"
    t.integer "answer_id", null: false
    t.string "value"
    t.float "weight", null: false
    t.string "iso", null: false
    t.integer "year", null: false
    t.bigint "region_4_year_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["region_4_year_id"], name: "index_answer_regions_on_region_4_year_id"
  end

  create_table "answers", force: :cascade do |t|
    t.integer "row_id", null: false
    t.integer "indicator_id", null: false
    t.integer "child_indicator_id"
    t.integer "answer_id", null: false
    t.string "value"
    t.float "weight", null: false
    t.string "iso", null: false
    t.integer "year", null: false
    t.bigint "country_4_year_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_4_year_id"], name: "index_answers_on_country_4_year_id"
  end

  create_table "blogs", id: :serial, force: :cascade do |t|
    t.string "title"
    t.text "summary"
    t.text "content"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "date"
    t.string "author"
    t.string "workstream"
    t.string "issuu_link"
    t.string "slug"
    t.boolean "published"
    t.string "custom_author"
    t.integer "category_id"
    t.string "record_type", default: "blog"
    t.boolean "is_featured", default: false
    t.integer "position"
  end

  create_table "blogs_regions", id: :serial, force: :cascade do |t|
    t.integer "blog_id"
    t.integer "region_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blog_id"], name: "index_blogs_regions_on_blog_id"
    t.index ["region_id"], name: "index_blogs_regions_on_region_id"
  end

  create_table "capital_cities", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "population"
    t.string "country_iso"
    t.string "capital_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.integer "position"
  end

  create_table "category_usages", id: :serial, force: :cascade do |t|
    t.string "category_type"
    t.string "category_name"
    t.string "subcategory"
    t.string "project_name"
    t.integer "num_rows"
    t.integer "num_projects"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ckeditor_assets", id: :serial, force: :cascade do |t|
    t.string "data_file_name", null: false
    t.string "data_content_type"
    t.integer "data_file_size"
    t.string "data_fingerprint"
    t.string "type", limit: 30
    t.integer "width"
    t.integer "height"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["type"], name: "index_ckeditor_assets_on_type"
  end

  create_table "commodities", id: :serial, force: :cascade do |t|
    t.string "country_iso"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", id: :serial, force: :cascade do |t|
    t.string "email"
    t.string "country"
    t.string "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "title"
    t.string "company"
    t.text "message"
  end

  create_table "countries", id: :serial, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "iso"
    t.string "bbox", default: [], array: true
    t.string "short_iso"
    t.boolean "has_fsp_maps", default: false
    t.text "background_data"
  end

  create_table "countries_blogs", id: :serial, force: :cascade do |t|
    t.integer "country_id"
    t.integer "blog_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blog_id"], name: "index_countries_blogs_on_blog_id"
    t.index ["country_id"], name: "index_countries_blogs_on_country_id"
  end

  create_table "countries_events", id: :serial, force: :cascade do |t|
    t.integer "country_id"
    t.integer "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_countries_events_on_country_id"
    t.index ["event_id"], name: "index_countries_events_on_event_id"
  end

  create_table "countries_libraries", id: :serial, force: :cascade do |t|
    t.integer "country_id"
    t.integer "library_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_countries_libraries_on_country_id"
    t.index ["library_id"], name: "index_countries_libraries_on_library_id"
  end

  create_table "countries_news", id: :serial, force: :cascade do |t|
    t.integer "country_id"
    t.integer "news_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_countries_news_on_country_id"
    t.index ["news_id"], name: "index_countries_news_on_news_id"
  end

  create_table "country_4_years", force: :cascade do |t|
    t.integer "year"
    t.float "total_msme"
    t.float "total"
    t.string "data_url"
    t.bigint "country_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_country_4_years_on_country_id"
  end

  create_table "country_partners", id: :serial, force: :cascade do |t|
    t.integer "country_id"
    t.integer "partner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_country_partners_on_country_id"
    t.index ["partner_id"], name: "index_country_partners_on_partner_id"
  end

  create_table "country_regions", id: :serial, force: :cascade do |t|
    t.integer "region_id"
    t.integer "country_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_country_regions_on_country_id"
    t.index ["region_id"], name: "index_country_regions_on_region_id"
  end

  create_table "datasets", id: :serial, force: :cascade do |t|
    t.integer "country_id"
    t.integer "user_id"
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "file_data"
    t.integer "category", default: 0, null: false
    t.integer "status", default: 0, null: false
    t.index ["country_id"], name: "index_datasets_on_country_id"
    t.index ["user_id"], name: "index_datasets_on_user_id"
  end

  create_table "documented_items", id: :serial, force: :cascade do |t|
    t.string "documentable_type"
    t.integer "documentable_id"
    t.integer "document_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["document_id", "documentable_id", "documentable_type"], name: "documentable_index", unique: true
    t.index ["document_id"], name: "index_documented_items_on_document_id"
    t.index ["documentable_type", "documentable_id"], name: "index_documented_items_on_documentable_type_and_documentable_id"
  end

  create_table "documents", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "file_file_name"
    t.string "file_content_type"
    t.integer "file_file_size"
    t.datetime "file_updated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", id: :serial, force: :cascade do |t|
    t.string "title"
    t.text "summary"
    t.text "content"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "date"
    t.string "author"
    t.string "url"
    t.string "slug"
    t.boolean "published"
    t.string "custom_author"
    t.integer "category_id"
    t.string "record_type", default: "event"
    t.boolean "is_featured", default: false
    t.integer "position"
  end

  create_table "events_regions", id: :serial, force: :cascade do |t|
    t.integer "event_id"
    t.integer "region_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_events_regions_on_event_id"
    t.index ["region_id"], name: "index_events_regions_on_region_id"
  end

  create_table "featured_positions", id: :serial, force: :cascade do |t|
    t.integer "position"
    t.string "positionable_type"
    t.integer "positionable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["positionable_type", "positionable_id"], name: "index_featured_positions_on_positionable"
  end

  create_table "friendly_id_slugs", id: :serial, force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "gross_domestic_product_by_regions", id: :serial, force: :cascade do |t|
    t.string "region"
    t.string "country"
    t.integer "year"
    t.float "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gross_domestic_product_by_sectors", id: :serial, force: :cascade do |t|
    t.string "sector"
    t.string "region"
    t.string "country"
    t.integer "year"
    t.float "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gross_domestic_product_over_times", id: :serial, force: :cascade do |t|
    t.string "country_name"
    t.string "iso"
    t.string "indicator_name"
    t.string "indicator_code"
    t.float "1960"
    t.float "1961"
    t.float "1962"
    t.float "1963"
    t.float "1964"
    t.float "1965"
    t.float "1966"
    t.float "1967"
    t.float "1968"
    t.float "1969"
    t.float "1970"
    t.float "1971"
    t.float "1972"
    t.float "1973"
    t.float "1974"
    t.float "1975"
    t.float "1976"
    t.float "1977"
    t.float "1978"
    t.float "1979"
    t.float "1980"
    t.float "1981"
    t.float "1982"
    t.float "1983"
    t.float "1984"
    t.float "1985"
    t.float "1986"
    t.float "1987"
    t.float "1988"
    t.float "1989"
    t.float "1990"
    t.float "1991"
    t.float "1992"
    t.float "1993"
    t.float "1994"
    t.float "1995"
    t.float "1996"
    t.float "1997"
    t.float "1998"
    t.float "1999"
    t.float "2000"
    t.float "2001"
    t.float "2002"
    t.float "2003"
    t.float "2004"
    t.float "2005"
    t.float "2006"
    t.float "2007"
    t.float "2008"
    t.float "2009"
    t.float "2010"
    t.float "2011"
    t.float "2012"
    t.float "2013"
    t.float "2014"
    t.float "2015"
    t.float "2016"
    t.float "2017"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "household_income_tiers", id: :serial, force: :cascade do |t|
    t.float "min"
    t.float "max"
    t.integer "count"
    t.integer "ntile"
    t.string "project_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "household_member_transaction_histories", id: :serial, force: :cascade do |t|
    t.integer "household_member_transaction_id"
    t.string "value"
    t.integer "month"
    t.integer "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "total_transaction_value"
    t.float "avg_value"
    t.float "min_value"
    t.float "max_value"
    t.float "rolling_balance"
    t.float "business_expenses"
    t.float "withdrawals"
    t.float "deposits"
    t.float "new_borrowing"
    t.float "repayment"
    t.datetime "date"
    t.index ["avg_value"], name: "index_household_member_transaction_histories_on_avg_value"
    t.index ["household_member_transaction_id", "month", "year"], name: "index_household_member_histories_on_member_id_month_year"
    t.index ["month", "year"], name: "index_household_member_transaction_histories_on_month_and_year"
    t.index ["month"], name: "index_household_member_transaction_histories_on_month"
    t.index ["year"], name: "index_household_member_transaction_histories_on_year"
  end

  create_table "household_member_transactions", id: :serial, force: :cascade do |t|
    t.string "project_name"
    t.string "household_name"
    t.string "person_code"
    t.string "gender"
    t.string "relationship_to_head"
    t.string "employed"
    t.string "status"
    t.string "category_type"
    t.string "category_name"
    t.string "subcategory"
    t.integer "age"
    t.integer "num_accounts"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "total_income"
  end

  create_table "household_subcategory_incomes", id: :serial, force: :cascade do |t|
    t.string "project_name"
    t.string "household_name"
    t.float "value"
    t.string "subcategory"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "household_transaction_histories", id: :serial, force: :cascade do |t|
    t.integer "household_transaction_id"
    t.string "value"
    t.integer "month"
    t.integer "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "total_transaction_value"
    t.float "avg_value"
    t.float "min_value"
    t.float "max_value"
    t.float "rolling_balance"
    t.float "business_expenses"
    t.float "withdrawals"
    t.float "deposits"
    t.float "new_borrowing"
    t.float "repayment"
    t.datetime "date"
    t.index ["avg_value"], name: "index_household_transaction_histories_on_avg_value"
    t.index ["household_transaction_id", "month", "year"], name: "index_household_histories_on_household_id_month_year"
    t.index ["month", "year"], name: "index_household_transaction_histories_on_month_and_year"
    t.index ["month"], name: "index_household_transaction_histories_on_month"
    t.index ["year"], name: "index_household_transaction_histories_on_year"
  end

  create_table "household_transactions", id: :serial, force: :cascade do |t|
    t.string "project_name"
    t.string "household_name"
    t.string "category_type"
    t.string "category_name"
    t.string "subcategory"
    t.integer "num_accounts"
    t.integer "num_members"
    t.integer "num_adults"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "total_income"
    t.index ["category_name"], name: "index_household_transactions_on_category_name"
    t.index ["category_type"], name: "index_household_transactions_on_category_type"
    t.index ["subcategory"], name: "index_household_transactions_on_subcategory"
  end

  create_table "indicators", id: :serial, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.datetime "date"
  end

  create_table "libraries", id: :serial, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.text "summary"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "date"
    t.string "url_resource"
    t.string "video_url"
    t.string "issuu_link"
    t.string "slug"
    t.boolean "published"
    t.integer "category_id"
    t.string "record_type", default: "library"
    t.boolean "is_featured", default: false
    t.integer "position"
    t.text "description"
  end

  create_table "libraries_regions", id: :serial, force: :cascade do |t|
    t.integer "library_id"
    t.integer "region_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["library_id"], name: "index_libraries_regions_on_library_id"
    t.index ["region_id"], name: "index_libraries_regions_on_region_id"
  end

  create_table "links", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "url", default: "", null: false
    t.integer "country_id"
    t.integer "region_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_links_on_country_id"
    t.index ["region_id"], name: "index_links_on_region_id"
  end

  create_table "member_income_tiers", id: :serial, force: :cascade do |t|
    t.float "min"
    t.float "max"
    t.integer "count"
    t.integer "ntile"
    t.string "project_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "member_subcategory_incomes", id: :serial, force: :cascade do |t|
    t.string "project_name"
    t.string "household_name"
    t.string "person_code"
    t.float "value"
    t.string "subcategory"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "members", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "position"
    t.string "organization_name"
    t.text "biography"
    t.string "role"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "date"
    t.integer "order"
  end

  create_table "news", id: :serial, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.text "summary"
    t.text "content"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "date"
    t.string "author"
    t.string "issuu_link"
    t.string "slug"
    t.boolean "published"
    t.integer "category_id"
    t.string "record_type", default: "news"
    t.boolean "is_featured", default: false
    t.integer "position"
  end

  create_table "news_regions", id: :serial, force: :cascade do |t|
    t.integer "news_id"
    t.integer "region_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["news_id"], name: "index_news_regions_on_news_id"
    t.index ["region_id"], name: "index_news_regions_on_region_id"
  end

  create_table "partners", id: :serial, force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "logo_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "website_url"
  end

  create_table "populations", id: :serial, force: :cascade do |t|
    t.string "region"
    t.string "country"
    t.string "gender"
    t.integer "year"
    t.float "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "project_metadata", id: :serial, force: :cascade do |t|
    t.string "project_name"
    t.string "name"
    t.string "country_iso2"
    t.string "country_iso3"
    t.string "currency_singular"
    t.string "currency_plural"
    t.string "currency_code"
    t.string "currency_symbol"
    t.integer "num_households_in_hh"
    t.integer "num_households_in_mem"
    t.integer "member_level_interviews"
    t.datetime "start_date"
    t.datetime "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "num_members_in_mem"
    t.string "province"
    t.text "custom_text"
  end

  create_table "region_4_years", force: :cascade do |t|
    t.integer "year"
    t.float "total"
    t.string "data_url"
    t.bigint "region_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["region_id"], name: "index_region_4_years_on_region_id"
  end

  create_table "region_partners", id: :serial, force: :cascade do |t|
    t.integer "region_id"
    t.integer "partner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["partner_id"], name: "index_region_partners_on_partner_id"
    t.index ["region_id"], name: "index_region_partners_on_region_id"
  end

  create_table "regions", id: :serial, force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "iso", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug", null: false
    t.text "flag_data"
    t.text "logo_data"
    t.text "background_data"
    t.index ["slug"], name: "index_regions_on_slug", unique: true
  end

  create_table "sessions", id: false, force: :cascade do |t|
    t.serial "id", null: false
    t.string "session_id", null: false
    t.text "data"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true
    t.index ["updated_at"], name: "index_sessions_on_updated_at"
  end

  create_table "tagged_items", id: :serial, force: :cascade do |t|
    t.string "taggable_type"
    t.integer "taggable_id"
    t.integer "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id", "taggable_id", "taggable_type"], name: "index_tagged_items_on_tag_id_and_taggable_id_and_taggable_type", unique: true
    t.index ["tag_id"], name: "index_tagged_items_on_tag_id"
    t.index ["taggable_type", "taggable_id"], name: "index_tagged_items_on_taggable_type_and_taggable_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.boolean "is_featured", default: false
    t.text "description"
    t.string "image_url"
    t.string "title"
    t.integer "position"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "token"
    t.string "email"
    t.string "encrypted_password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "surname"
    t.string "company"
    t.string "position"
    t.string "city"
    t.string "country"
    t.string "attribution"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["token"], name: "index_users_on_token"
  end

end
