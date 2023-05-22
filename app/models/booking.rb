class Booking < ApplicationRecord
    belongs_to :listing
    belongs_to :user
    has_many :booked_dates, dependent: :destroy

    validates :user_id, presence: true
    validates :listing_id, presence: true
    validates_datetime :start_date, presence: true
    validates_datetime :end_date, presence: true, on_or_after: :start_date
    validates :number_of_guests,  numericality: {greater_than: 1}

    def determine_price
        number_of_days = (self.start_date - self.end_date).to_i + 1
        self.price = number_of_days * self.listing.unit_price
    end

    def book_dates
        puts self.id
        start_date = self.start_date.to_date
        end_date = self.end_date.to_date

        (start_date..end_date).each do |date|
            BookedDate.create(listing_id: self.listing_id, booking_id: self.id, date: date)
        end
    end

end
