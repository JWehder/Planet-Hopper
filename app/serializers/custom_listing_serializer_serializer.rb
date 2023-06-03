class CustomListingSerializer < ActiveModel::Serializer
  attributes :name, :city, :state_province, :country, :planet, :description, :unit_price, :type_of_accomodation, :owner, :max_guests_allowed, :photos, :longitude, :latitude
  
  has_many :bookings
  has_many :booked_dates

  private

  def

  def owner
    "#{object.owner.first_name} #{object.owner.last_name}"
  end

end
