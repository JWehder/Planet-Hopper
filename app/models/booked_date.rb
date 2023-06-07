class BookedDate < ApplicationRecord
    belongs_to :listing
    belongs_to :booking

    validate :check_listing_availability
    validates_datetime :date, presence: true

end
