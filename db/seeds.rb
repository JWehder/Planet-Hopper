require 'date'
require 'faker'
require 'geocoder'

require_relative 'seed_data.rb'

# $planets.each do |planet|
#     Planet.create(planet)
# end

# Listing.all.each do |listing|
#     listing.update!(photos: $photos.sample(3))
# end

# $users.each do |user|
#     User.create!(user)
# end

# $listings.each do |listing| 
#     location = $locations.sample
#     address = Geocoder.search([location[:latitude], location[:longitude]]).first
#     user_id = User.where(host: true).sample.id
#     puts location[:latitude], location[:longitude]
#     puts address.city
#     puts address.state
#     Listing.create!(
#         name: listing[:title],
#         street_address: address.address,
#         city: address.city,
#         state_province: address.state,
#         country: address.country,
#         planet_id: Planet.all.sample.id,
#         owner_id: user_id,
#         description: listing[:description],
#         unit_price: rand(125..1250),
#         type_of_accomodation: listing[:type_of_accomodation],
#         max_guests_allowed: rand(1..12),
#         longitude: address.longitude,
#         latitude: address.latitude,
#         photos: $photos.sample(3)
#       )
# end

# 12.times do 
#     listing = Listing.all.sample
#     booking = Booking.create(user_id: User.all.sample.id, listing_id: listing.id, start_date: DateTime.now + rand(1..30), end_date: DateTime.now + rand(31..60), number_of_guests: listing.max_guests_allowed)
# end

# Booking.all.each do |booking|
#     booking.determine_price
#     booking.book_dates
# end

puts "done seeding"