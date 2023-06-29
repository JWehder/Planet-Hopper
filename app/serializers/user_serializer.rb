class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :bio, :email, :profile_picture, :host

  has_many :bookings
  has_many :owned_listings
end
