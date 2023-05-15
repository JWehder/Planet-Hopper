# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

planets = [
    {name: "Aurora", description: "Aurora is a planet that is known for its stunning natural light shows, similar to the Northern Lights on Earth. The planet's atmosphere is filled with charged particles that create beautiful, colorful displays in the sky. Despite the harsh weather conditions, Aurora is home to a diverse range of flora and fauna, including towering trees and brightly-colored birds. Adventurers flock to Aurora to explore its rugged terrain and witness the breathtaking auroras that dance across the sky."},
    {name: "Nebula", description: "Nebula is a planet that lives up to its name. The planet is surrounded by a swirling cloud of gas and dust that creates a surreal, dreamlike environment. Nebula is home to a variety of exotic creatures, including shimmering butterflies and iridescent fish. The planet's oceans are said to contain healing properties that can cure a range of ailments. Visitors to Nebula often describe feeling as though they have stepped into a different dimension."},
    {name: "Galaxia", description: "Galaxia is a planet that is known for its vibrant nightlife and bustling cities. The planet's inhabitants are passionate about art, music, and fashion, and the streets are alive with energy and creativity. Despite the fast-paced lifestyle, Galaxia is also home to serene beaches, lush rainforests, and breathtaking mountain ranges. Visitors to Galaxia can immerse themselves in the culture and nightlife of the cities or escape to the tranquil countryside for a more peaceful experience."},
    {name: "Orion", description: "Orion is a planet that is known for its mysterious, otherworldly landscape. The planet is shrouded in mist and surrounded by towering mountains that seem to reach up to the sky. Despite the harsh conditions, Orion is home to a range of fascinating creatures, including bioluminescent insects and massive, tentacled beasts. Visitors to Orion often describe feeling as though they have stepped onto another planet altogether."},
    {name: "Nova", description: "Nova is a planet that is known for its breathtaking natural wonders, including massive geysers, towering waterfalls, and shimmering lakes. The planet's landscape is both beautiful and dangerous, with treacherous cliffs and rugged canyons that are perfect for adventurous travelers. Nova is also home to a range of fascinating creatures, including majestic eagles and elusive panthers. Visitors to Nova are sure to be awed by the planet's natural beauty and the incredible diversity of life that thrives there."},
    {name: "Earth", description: "Earth is the planet that we call home. It is known for its incredible diversity of life, including millions of plant and animal species. Earth is also the only known planet in the universe that can sustain human life. The planet is home to stunning natural wonders, including towering mountains, vast oceans, and endless expanses of desert. Visitors to Earth can explore a range of different cultures and landscapes, from the bustling cities to the tranquil countryside. Whether you're looking for adventure or relaxation, Earth has something for everyone."}
]

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