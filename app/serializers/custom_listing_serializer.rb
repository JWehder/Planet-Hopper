class CustomListingSerializer < ActiveModel::Serializer
  attributes :name, :city, :state_province, :country, :planet, :unit_price, :max_guests_allowed, :photos, :distance_between
  
  has_many :bookings
  has_many :booked_dates

  private

  def distance_between
    
  end

  def types_of_accomodations
    Listing.group(:type_of_accomodation).count
  end

  def planet
    Planet.find(object.planet_id).name
  end

  def owner
    "#{object.owner.first_name} #{object.owner.last_name}"
  end

end
