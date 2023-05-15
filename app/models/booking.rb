class Booking < ApplicationRecord
    belongs_to :listing
    belongs_to :user

    validates :user_id, presence: true
    validates :listing_id, presence: true
    validates :start_date, presence: true
    validates :end_date, presence: true
    validates_datetime :start_date
    validates_datetime :end_date, on_or_after :start_time
    validates :price, presence: true
    validates :number_of_guests,  numericality: {greater_than: 1}

    def determine_price
        number_of_days = (self.start_date - self.end_date).to_i + 1
        booking.price = number_of_days * booking.listing.unit_price
    end

    def book_dates
        (self.start_date..self.end_date).each do |date|
            BookedDate.create(listing_id: self.listing_id, booking_id: self.id, date: date)
        end
    end

end
