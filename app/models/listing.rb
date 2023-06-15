class Listing < ApplicationRecord
    has_many :bookings, dependent: :destroy
    has_many :booked_dates, through: :bookings
    has_many :users, through: :bookings
    belongs_to :planet
    belongs_to :owner, class_name: "User", foreign_key: "owner_id"

    before_destroy :destroy_booked_dates

    reverse_geocoded_by :latitude, :longitude
    after_validation :reverse_geocode

    validate :validate_if_host
    validate :photos_count

    validates :name, presence: true, length: {minimum: 8}
    validates :city, presence: true
    validates :state_province, presence: true
    validates :country, presence: true
    validates :planet_id, presence: true
    validates :owner_id, presence: true
    validates :unit_price, presence: true, numericality: {greater_than_or_equal_to: 25}
    validates :max_guests_allowed, presence: true, numericality: {greater_than_or_equal_to: 1}

    def destroy_booked_dates
        self.booked_dates.destroy_all
    end

    def self.query_listing(latitude, longitude, start_date, end_date, guests)
        # listings = Listing.near([latitude, longitude], 100, units: :mi)
        # .where('max_guests_allowed >= ?', guests)
        # .where.not(id: Listing.joins(bookings: :booked_dates)
        #                      .where(booked_dates: { date: start_date..end_date })
        #                      .select('listings.id'))
        # listings = Listing.select(:id, :other_attributes) 
        #           .near([41.8933203, 12.4829321], 100, units: :mi)
        #           .where('max_guests_allowed >= ?', 5)
        #           .left_outer_joins(:booked_dates)
        #           .where.not(booked_dates: { date: "2023-08-09".."2023-08-12" })
        listings = Listing.near([latitude, longitude], 100, units: :mi)
        .where('max_guests_allowed >= ?', guests)
        .where.not(id: Listing.joins(bookings: :booked_dates)
                            .where(booked_dates: { date: start_date..end_date })
                            .select('listings.id'))
        listings
    end
        
    def self.query_users_listings(longitude, latitude)
        results = Geocoder.search([longitude, latitude])
        results = results.first.city
        users_listings_results = self.where(city: results).limit(10)
    end

    def self.query_types_of_accomodations
        Listing.group(:type_of_accomodation).count
    end

    def distance_to_listing(users_latitude, users_longitude)
        Geocoder::Calculations.distance_between([users_latitude, users_longitude], [self.latitude, self.longitude])
    end
    
    def self.query_city_listings(city)
        city_listings = self.where(city: city).limit(10)
    end

    def self.query_homepage_listings(latitude, longitude)
        homepage_listings_query = Listing
        .where(city: ["Paris", "New York", "Phoenix"])
        .group(:city, :id)
        .having('COUNT(*) <= 4')
        .limit(12)
        .to_a

        user_listings_query = Listing
        .near([latitude, longitude], 400, units: :mi)
        .limit(16 - homepage_listings_query.count)
        .to_a

        merged_listings = homepage_listings_query + user_listings_query
        merged_listings
    end

    def find_dates
        available_dates = nil
        found_dates = false

        until found_dates
            nights_staying = rand(1..45)
            date = Date.today + rand(1..365)
            booked_dates = self.booked_dates.where(date: (date..date + nights_staying))
            if booked_dates.empty?
                available_dates = date..date + nights_staying
                found_dates = true
            end
        end
        available_dates
    end

    private

    def photos_count
        if self.photos.size > 10 || self.photos.size < 1
            errors.add(:photos, "we require a minimum of one photo and impose a maximum of ten photos on one listing")
        end
    end

    def validate_if_host
        errors.add(:owner, "owner is not a host.") unless self.owner&.host?
    end

    def query_not_found_response
        render json: {errors: "listing not found"}, status: :not_found
    end
end
