class Booking < ApplicationRecord
    belongs_to :listing
    belongs_to :user
    has_many :booked_dates, dependent: :destroy

    validate :check_listing_max_guests
    validate :check_listing_availability

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
        (self.start_date...self.end_date).each do |date|
            BookedDate.create(listing_id: self.listing_id, booking_id: self.id, date: date)
        end
    end

    private

    def check_listing_availability
        if self.listing.booked_dates.exists?(date: (self.start_date..self.end_date))
            errors.add(:base, "The selected dates conflict with existing bookings. Please try again.")
        end
    end

    def check_listing_max_guests
        if self.number_of_guests > self.listing.max_guests_allowed
            errors.add(:number_of_guests, "this property allows #{self.listing.max_guests_allowed} guests")
        end
    end

end
