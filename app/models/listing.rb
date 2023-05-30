class Listing < ApplicationRecord
    has_many :bookings, dependent: :destroy
    has_many :booked_dates, through: :bookings
    has_many :users, through: :bookings
    belongs_to :planet
    belongs_to :owner, class_name: "User", foreign_key: "owner_id"

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

    def self.query_listing(search_term, date, guests)
        parsed_date = DateTime.parse(date)
        search_results = self.joins(:planets)
            .joins(:booked_dates)
            .where("listings.city ILIKE ? OR listings.state ILIKE ? OR planets.name ILIKE ? AND listings.max_guests_allowed >= ?", "%#{search_term}%", "%#{search_term}%", "%#{search_term}%", "%#{guests}%")
            .where.not(booked_dates: { date: parsed_date })
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
