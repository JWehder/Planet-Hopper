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

end
