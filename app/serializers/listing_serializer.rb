class ListingSerializer < ActiveModel::Serializer
  attributes :name, :city, :state_province, :country, :planet, :description, :unit_price, :type_of_accomodation, :max_guests_allowed, :photos, :longitude, :latitude, :street_address, :custom_method
  
  has_many :bookings
  has_many :booked_dates

  private

  def custom_method
    self.object.unit_price + 10
  end

  # def distance_from_self
  #   object.distance_between([instance_options[:latitude], instance_options[:longitude]])
  # end

  # def types_of_accomodations
  #   Listing.group(:type_of_accomodation).count
  # end

  def planet
    Planet.find(self.object.planet_id).name
  end

  def listing_owner
    "#{self.object.owner.first_name} #{self.object.owner.last_name}"
  end
end
