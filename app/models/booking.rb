class Booking < ApplicationRecord
    belongs_to :listing
    belongs_to :user
    has_many :booked_dates, dependent: :destroy

    validate :check_listing_max_guests
    validate :check_listing_availability
    validate :greater_than_start_date
    validate :start_date_uniqueness
    validate :end_date_uniqueness
    validate :start_date_type?
    validate :end_date_type?

    validates :user_id, presence: true
    validates :listing_id, presence: true
    validates :start_date, presence: true
    validates :end_date, presence: true
    validates :number_of_guests,  numericality: {greater_than_or_equal_to: 1}

    # after_commit :determine_price, :book_dates, :add_fees, on: :create

    # def determine_price
    #     number_of_days = (self.start_date - self.end_date).to_i + 1
    #     price = number_of_days * self.listing.unit_price
    #     self.update!(price: price)
    # end

    def book_dates
        (self.start_date...self.end_date).each do |date|
            booked_date = self.booked_dates.create!(listing_id: self.listing_id, booking_id: self.id, date: date)
        end
    end

    # def add_fees
    #     self.update!(fees: self.price.to_f * 0.05) 
    # end

    private

    def start_date_type?
        if !self.start_date.is_a?(Date)
          errors.add(:start_date, "must be a valid date")
        end
    end

    def end_date_type?
        if !self.end_date.is_a?(Date)
            errors.add(:end_date, "must be a valid date")
        end
    end

    def start_date_uniqueness
        listing = Listing.find(self.listing_id)
        if listing.booked_dates.where(date: self.start_date).exists?
            errors.add(:start_date, "This start date has already been booked.")
        end
    end

    def end_date_uniqueness
        listing = Listing.find(self.listing_id)
        if listing.booked_dates.where(date: self.end_date).exists?
            errors.add(:end_date, "This end date has already been booked.")
        end
    end

    def greater_than_start_date
        if self.start_date >= self.end_date
            errors.add(:end_date, "The end date must take place after the start date.")
        end
    end

    def check_listing_availability
        listing = Listing.find(self.listing_id)
        if listing.booked_dates.where(date: (self.start_date..self.end_date)).exists?
            errors.add(:base, "The selected dates conflict with existing bookings. Please try again.")
        end
    end

    def check_listing_max_guests
        if self.number_of_guests > self.listing.max_guests_allowed
            errors.add(:number_of_guests, "this property allows #{self.listing.max_guests_allowed} guests")
        end
    end

end
