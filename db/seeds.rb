# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
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