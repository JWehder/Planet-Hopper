class User < ApplicationRecord
    attr_accessor :updating_password

    has_many :bookings
    has_many :listings, through: :bookings
    has_many :booked_dates, through: :bookings
    has_many :owned_listings, foreign_key: :owner_id, class_name: "Listing"

    has_secure_password
    validates :username, presence: true, uniqueness: true, length: { in: 5..25 }
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :password, length: { minimum: 8 }, format: { with: /\A(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[[:^alnum:]])/x }, if: :updating_password
    validates :email, presence: true,
        format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i },
        uniqueness: { case_sensitive: false }
    validates :password_confirmation, presence: true, if: :updating_password

    def host?
        self.host
    end

end
