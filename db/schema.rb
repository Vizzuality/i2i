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

ActiveRecord::Schema.define(version: 20171017134349) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.string   "author_type"
    t.integer  "author_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree
  end

  create_table "admin_users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "blogs", force: :cascade do |t|
    t.string   "title"
    t.text     "summary"
    t.text     "content"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.datetime "date"
    t.string   "author"
    t.string   "workstream"
    t.string   "issuu_link"
    t.string   "slug"
    t.boolean  "published"
    t.string   "custom_author"
    t.string   "record_type",        default: "blog"
    t.integer  "category_id"
    t.boolean  "is_featured",        default: false
  end

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "slug"
  end

  create_table "category_usages", force: :cascade do |t|
    t.string   "category_type"
    t.string   "category_name"
    t.string   "subcategory"
    t.string   "project_name"
    t.integer  "num_rows"
    t.integer  "num_projects"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "ckeditor_assets", force: :cascade do |t|
    t.string   "data_file_name",               null: false
    t.string   "data_content_type"
    t.integer  "data_file_size"
    t.string   "data_fingerprint"
    t.string   "type",              limit: 30
    t.integer  "width"
    t.integer  "height"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["type"], name: "index_ckeditor_assets_on_type", using: :btree
  end

  create_table "contacts", force: :cascade do |t|
    t.string   "email"
    t.string   "country"
    t.string   "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "countries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
    t.string   "iso"
  end

  create_table "documented_items", force: :cascade do |t|
    t.string   "documentable_type"
    t.integer  "documentable_id"
    t.integer  "document_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["document_id", "documentable_id", "documentable_type"], name: "documentable_index", unique: true, using: :btree
    t.index ["document_id"], name: "index_documented_items_on_document_id", using: :btree
    t.index ["documentable_type", "documentable_id"], name: "index_documented_items_on_documentable_type_and_documentable_id", using: :btree
  end

  create_table "documents", force: :cascade do |t|
    t.string   "name"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "events", force: :cascade do |t|
    t.string   "title"
    t.text     "summary"
    t.text     "content"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.datetime "date"
    t.string   "author"
    t.string   "url"
    t.string   "slug"
    t.boolean  "published"
    t.string   "custom_author"
    t.string   "record_type",        default: "event"
    t.integer  "category_id"
    t.boolean  "is_featured",        default: false
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree
  end

  create_table "household_member_transaction_histories", force: :cascade do |t|
    t.integer  "household_member_transaction_id"
    t.string   "value"
    t.integer  "month"
    t.integer  "year"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.index ["household_member_transaction_id", "month", "year"], name: "index_household_member_histories_on_member_id_month_year", using: :btree
    t.index ["month", "year"], name: "index_household_member_transaction_histories_on_month_and_year", using: :btree
    t.index ["month"], name: "index_household_member_transaction_histories_on_month", using: :btree
    t.index ["year"], name: "index_household_member_transaction_histories_on_year", using: :btree
  end

  create_table "household_member_transactions", force: :cascade do |t|
    t.string   "project_name"
    t.string   "household_name"
    t.string   "person_code"
    t.string   "gender"
    t.string   "relationship_to_head"
    t.string   "employed"
    t.string   "status"
    t.string   "category_type"
    t.string   "category_name"
    t.string   "subcategory"
    t.integer  "age"
    t.integer  "num_accounts"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "household_transaction_histories", force: :cascade do |t|
    t.integer  "household_transaction_id"
    t.string   "value"
    t.integer  "month"
    t.integer  "year"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["household_transaction_id", "month", "year"], name: "index_household_histories_on_household_id_month_year", using: :btree
    t.index ["month", "year"], name: "index_household_transaction_histories_on_month_and_year", using: :btree
    t.index ["month"], name: "index_household_transaction_histories_on_month", using: :btree
    t.index ["year"], name: "index_household_transaction_histories_on_year", using: :btree
  end

  create_table "household_transactions", force: :cascade do |t|
    t.string   "project_name"
    t.string   "household_name"
    t.string   "category_type"
    t.string   "category_name"
    t.string   "subcategory"
    t.integer  "num_accounts"
    t.integer  "num_members"
    t.integer  "num_adults"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["category_name"], name: "index_household_transactions_on_category_name", using: :btree
    t.index ["category_type"], name: "index_household_transactions_on_category_type", using: :btree
    t.index ["subcategory"], name: "index_household_transactions_on_subcategory", using: :btree
  end

  create_table "indicators", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
    t.datetime "date"
  end

  create_table "libraries", force: :cascade do |t|
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "title"
    t.text     "summary"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "date"
    t.string   "url_resource"
    t.string   "video_url"
    t.string   "issuu_link"
    t.string   "slug"
    t.boolean  "published"
    t.string   "record_type",        default: "library"
    t.integer  "category_id"
    t.boolean  "is_featured",        default: false
  end

  create_table "members", force: :cascade do |t|
    t.string   "name"
    t.string   "position"
    t.string   "organization_name"
    t.text     "biography"
    t.string   "role"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "slug"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.date     "date"
    t.integer  "order"
  end

  create_table "news", force: :cascade do |t|
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "title"
    t.text     "summary"
    t.text     "content"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "date"
    t.string   "author"
    t.string   "issuu_link"
    t.string   "slug"
    t.boolean  "published"
    t.string   "record_type",        default: "news"
    t.integer  "category_id"
    t.boolean  "is_featured",        default: false
  end

  create_table "project_metadata", force: :cascade do |t|
    t.string   "project_name"
    t.string   "name"
    t.string   "country_iso2"
    t.string   "country_iso3"
    t.string   "currency_singular"
    t.string   "currency_plural"
    t.string   "currency_code"
    t.string   "currency_symbol"
    t.integer  "num_households_in_hh"
    t.integer  "num_households_in_mem"
    t.integer  "member_level_interviews"
    t.datetime "start_date"
    t.datetime "end_date"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "num_members_in_mem"
  end

  create_table "sessions", force: :cascade do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
    t.index ["updated_at"], name: "index_sessions_on_updated_at", using: :btree
  end

  create_table "tagged_items", force: :cascade do |t|
    t.string   "taggable_type"
    t.integer  "taggable_id"
    t.integer  "tag_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["tag_id", "taggable_id", "taggable_type"], name: "index_tagged_items_on_tag_id_and_taggable_id_and_taggable_type", unique: true, using: :btree
    t.index ["tag_id"], name: "index_tagged_items_on_tag_id", using: :btree
    t.index ["taggable_type", "taggable_id"], name: "index_tagged_items_on_taggable_type_and_taggable_id", using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "slug"
    t.boolean  "is_featured", default: false
    t.text     "description"
    t.string   "image_url"
    t.string   "title"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "token"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["token"], name: "index_users_on_token", using: :btree
  end

end
