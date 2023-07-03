class CustomListingSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state_province, :country, :planet, :description, :unit_price, :type_of_accomodation, :max_guests_allowed, :photos, :longitude, :latitude, :distance_from_user, :bedrooms, :bathrooms, :beds, :listing_owner

  has_many :bookings

  def distance_from_user
    self.object.distance_to([instance_options[:latitude], instance_options[:longitude]])
  end

  def planet
    Planet.find(self.object.planet_id).name
  end

  def listing_owner
    "#{self.object.owner.first_name} #{self.object.owner.last_name}"
  end

end
