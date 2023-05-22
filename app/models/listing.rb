class Listing < ApplicationRecord
    has_many :bookings, dependent: :destroy
    has_many :booked_dates, through: :bookings
    has_many :users, through: :bookings
    belongs_to :planet

    # validates :name, presence: true, length: {minimum: 8}
    # validates :city, presence: true
    # validates :state_province, presence: true
    # validates :country, presence: true
    # validates :planet_id, presence: true
    # validates :user_id, presence: true
    # validates :unit_price, presence: true, numericality: {greater_than_or_equal_to: 25}
    # validates :max_guests_allowed, presence: true, numericality: {min: 1}

    def self.query_listing(search_term, date, guests)
        search_results = self.joins(:planets)
            .joins(:booked_dates)
            .where("listings.city ILIKE ? OR listings.state ILIKE ? OR planets.name ILIKE ? AND listings.max_guests_allowed >= ?", "%#{search_term}%", "%#{search_term}%", "%#{search_term}%", "%#{guests}%")
            .where.not(booked_dates: { date: date })
        search_results
    end
        
    def self.query_users_listings(longitude, latitude)
        results = Geocoder.search([longitude, latitude])
        results = results.first.city
        users_listings_results = self.where(city: results).limit(10)
    end

    def self.query_city_listings(city)
        city_listings = self.where(city: city).limit(10)
    end

    def self.query_types_of_accomodations
        self.group(:type_of_accomodation).count
    end

    private

    def query_not_found_response
        render json: {errors: "listing not found"}, status: :not_found
    end
end
