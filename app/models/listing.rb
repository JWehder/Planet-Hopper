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
    validates :country, presence: true
    validates :planet_id, presence: true
    validates :owner_id, presence: true
    validates :unit_price, presence: true, numericality: {greater_than_or_equal_to: 25}
    validates :max_guests_allowed, presence: true, numericality: {greater_than_or_equal_to: 1}

    def destroy_booked_dates
        self.booked_dates.destroy_all
    end

    def self.query_listing(listing_params)

        coords = [listing_params[:latitude], listing_params[:longitude]]

        if listing_params[:latitude].blank? || listing_params[:longitude].blank?
            listings = Listing.search_by_name(listing_params)
        else
            listings = Listing.search_listings_by_coords(coords, listing_params)
        end
        
        listings
    end

    def self.search_by_name(listing_params)
        address = listing_params[:address].scan(/[A-Za-z]+/)

        listings = Listing.where('max_guests_allowed >= ?', listing_params[:guests])
        .where.not(id: Listing.joins(bookings: :booked_dates)
                              .where(booked_dates: { date: listing_params[:start_date]...listing_params[:end_date] })
                              .select('listings.id'))

        address.each do |string|
            listings = listings.where('LOWER(city) LIKE ? OR LOWER(state_province) LIKE ? OR LOWER(country) LIKE ?', "%#{string.downcase}%", "%#{string.downcase}%", "%#{string.downcase}%")
        end

        listings
    end

    def self.search_listings_by_coords(coords, listing_params)
        Listing.near(coords, 600, units: :mi)
                .where('max_guests_allowed >= ?', listing_params[:guests])
                .where.not(id: Listing.joins(bookings: :booked_dates)
                                      .where(booked_dates: { date: listing_params[:start_date]...listing_params[:end_date] })
                                      .select('listings.id'))
    end
        
    def self.query_users_listings(listing_params)
        results = Geocoder.search(listing_params[:latitude], listing_params[:longitude])
        results = results.first.city
        users_listings_results = self.where(city: results).limit(10)
    end

    def self.query_types_of_accomodations
        Listing.group(:type_of_accomodation).count
    end

    def distance_to_listing(users_latitude, users_longitude)
        Geocoder::Calculations.distance_between([users_latitude, users_longitude], [self.latitude, self.longitude])
    end
    
    def self.query_homepage_cities
        self.group(:city).order('count_id DESC').count('id').first(4).map(&:first)
    end

    def self.query_homepage_listings(latitude, longitude)
        cities = Listing.query_homepage_cities
        homepage_listings_query = Listing
        .where(city: cities)
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

        until available_dates
            nights_staying = rand(1..30)
            start_date = Date.today + rand(1..365)
            end_date = start_date + nights_staying
            if not self.booked_dates.where(date: start_date...end_date).exists?
                available_dates = [start_date, end_date]
            end
        end
        puts available_dates
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
