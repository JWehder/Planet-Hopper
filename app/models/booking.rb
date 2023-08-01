class Booking < ApplicationRecord
    belongs_to :listing
    belongs_to :user
    has_many :booked_dates, dependent: :destroy

    validate :check_listing_max_guests
    validate :greater_than_start_date
    validate :start_date_type?
    validate :end_date_type?
    validate :dates_taken?

    validates :user_id, presence: true
    validates :listing_id, presence: true
    validates :start_date, presence: true
    validates :end_date, presence: true
    validates :number_of_guests,  numericality: {greater_than_or_equal_to: 1}

    validates_uniqueness_of :start_date, scope: :listing_id
    validates_uniqueness_of :end_date, scope: :listing_id

    after_create :book_dates
    after_update :book_new_dates, :delete_unused_dates

    def determine_price
        number_of_nights = ((self.start_date...self.end_date).to_a).count 
        price = number_of_nights * self.listing.unit_price
        self.price = price
        self.add_fees(price)
    end

    def book_new_dates
        date_range = self.start_date...self.end_date
        date_range.each do |date|
            if self.booked_dates.where(date: date).empty?
                self.booked_dates.create!(listing_id: self.listing_id, booking_id: self.id, date: date)
            end
        end
    end

    def delete_unused_dates
        date_range = self.start_date...self.end_date
        self.booked_dates.where.not(date: date_range).delete_all
    end

    def book_dates
        puts "booking #{self.start_date} through #{self.end_date}"
        (self.start_date...self.end_date).each do |date|
            booked_date = self.booked_dates.create!(listing_id: self.listing_id, booking_id: self.id, date: date)
        end
    end

    def add_fees(price)
        self.fees = price.to_f * 0.05
    end

    private

    def dates_taken?
        date_range = self.start_date...self.end_date
        listing = Listing.find(self.listing_id)
        if listing.booked_dates.where(date: date_range).exists?
            errors.add(:booking, "the date range you chose includes booked dates. Please edit your booking.")
        end
    end

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

    def greater_than_start_date
        if self.start_date >= self.end_date
            errors.add(:end_date, "The end date must take place after the start date.")
        end
    end

    def check_listing_max_guests
        if self.number_of_guests > self.listing.max_guests_allowed
            errors.add(:number_of_guests, "this property allows #{self.listing.max_guests_allowed} guests")
        end
    end

end
