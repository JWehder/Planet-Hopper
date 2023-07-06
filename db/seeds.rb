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
#     city = $cities.sample
#     puts city
#     address = Geocoder.search(city).first
#     user_id = User.where(host: true).sample.id
#     puts "here"
#     puts address.latitude, address.longitude
#     puts address.city
#     puts address.state
#     puts address.address
#     Listing.create!(
#         name: listing[:title],
#         address: address.address,
#         city: address.city,
#         state_province: address.state,
#         country: address.country,
#         planet_id: Planet.all.sample.id,
#         owner_id: user_id,
#         description: listing[:description],
#         unit_price: rand(125..1250),
#         type_of_accomodation: listing[:type_of_accomodation],
#         max_guests_allowed: rand(1..12),
#         latitude: address.latitude,
#         longitude: address.longitude,
#         photos: $photos.sample(3)
#     )
# end

# $listings2.each do |listing|
#     city = $cities.sample
#     address = Geocoder.search(city).first
#     user_id = User.where(host: true).sample.id
#     puts address.latitude, address.longitude
#     puts address.city
#     puts address.state
#     puts address.address
#     Listing.create!(
#         name: listing[:title],
#         address: address.address,
#         city: address.city,
#         state_province: address.state,
#         country: address.country,
#         planet_id: Planet.all.sample.id,
#         owner_id: user_id,
#         description: listing[:description],
#         unit_price: rand(125..1250),
#         type_of_accomodation: listing[:type_of_accomodation],
#         max_guests_allowed: rand(1..12),
#         latitude: address.latitude,
#         longitude: address.longitude,
#         photos: $photos.sample(3)
#     )
# end

# Listing.all.each do |listing|
#     12.times do
#         dates = listing.find_dates
#         booking = Booking.create(user_id: User.all.sample.id, listing_id: listing.id, start_date: dates.first, end_date: dates.last, number_of_guests: listing.max_guests_allowed)
#         booking.determine_price
#         booking.book_dates
#     end
# end

# Booking.all.each do |booking|
#     booking.determine_price
#     booking.book_dates
# end

# Listing.all.each do |listing|
#     guests = listing.max_guests_allowed
#     listing.update!(bedrooms: guests, beds: guests + 2, bathrooms: guests, planet_id: 6)
# end

# cities.each do |city|
#     results = Geocoder.search(city)
#     puts results.first.coordinates
#     puts results.first.address
# end

Listing.all.each do |listing|
    listing.update!(photos: $photos.sample(5))
end

10.times do 

    address = Geocoder.search(city).first
    user_id = User.where(host: true).sample.id
    puts address.latitude, address.longitude
    puts address.city
    puts address.state
    puts address.address
    Listing.create!(
        name: listing[:title],
        address: $alien_addresses,
        city: $alien_cities,
        state_province: $state_names,
        country: address.country,
        planet_id: Planet.all.sample.id,
        owner_id: user_id,
        description: listing[:description],
        unit_price: rand(125..1250),
        type_of_accomodation: listing[:type_of_accomodation],
        max_guests_allowed: rand(1..12),
        latitude: address.latitude,
        longitude: address.longitude,
        photos: $photos.sample(3)
    )
end

puts "done seeding"