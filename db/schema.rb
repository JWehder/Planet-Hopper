# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_05_13_024826) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "booked_dates", force: :cascade do |t|
    t.bigint "booking_id", null: false
    t.bigint "listing_id", null: false
    t.datetime "date", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["booking_id"], name: "index_booked_dates_on_booking_id"
    t.index ["date"], name: "index_booked_dates_on_date"
    t.index ["listing_id"], name: "index_booked_dates_on_listing_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.integer "user_id"
    t.integer "listing_id"
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer "price"
    t.integer "number_of_guests"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "receipt_number"
  end

  create_table "listings", force: :cascade do |t|
    t.string "name"
    t.string "city"
    t.string "state_province"
    t.string "country"
    t.integer "planet_id"
    t.integer "user_id"
    t.string "description"
    t.integer "unit_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "type_of_accomodation"
    t.integer "owner_id"
    t.integer "max_guests_allowed"
  end

  create_table "planets", force: :cascade do |t|
    t.string "name"
    t.integer "age"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "password_digest"
    t.string "code"
    t.datetime "request_time"
    t.string "bio"
    t.string "email"
    t.string "profile_picture"
    t.boolean "host"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "booked_dates", "bookings"
  add_foreign_key "booked_dates", "listings"
end
