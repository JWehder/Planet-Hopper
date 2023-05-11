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

end
