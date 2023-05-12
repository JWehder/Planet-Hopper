class Listing < ApplicationRecord
    has_many :bookings
    has_many :users, through: :bookings
    belongs_to :planet

    validates :name, presence: true, length: {minimum: 8}
    validates :city, presence: true
    validates :state_province, presence: true
    validates :country, presence: true
    validates :planet_id, presence: true
    validates :user_id, presence: true
    validates :unit_price, presence: true, numericality: {greater_than_or_equal_to: 25}

    def not_available_dates
        # I need an iterator to query through the listings bookings and provide
        not_available_dates = []
        self.bookings.map do |booking|
            not_available_dates << (booking.start_date...booking.end_date)
        end
    # find periods of times where there is no booking
    # find listings that house less than or equal the number of guests
    # find listing where the particular location is
    # upon initial rendering of the page, the user should see which dates are taken
        not_available_dates
    end

    def self.query_available_dates
        self.

end
