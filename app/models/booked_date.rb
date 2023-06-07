class BookedDate < ApplicationRecord
    belongs_to :listing
    belongs_to :booking

    validate :check_listing_availability
    validates_datetime :date, presence: true

    private

    def check_listing_availability
        if self.listing.booked_dates.exists?(date: self.date)
            errors.add(:base, "This date is booked.")
        end
    end

end
