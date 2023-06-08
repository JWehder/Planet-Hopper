class ListingSerializer < ActiveModel::Serializer
  attributes :name, :city, :state_province, :country, :planet, :unit_price, :max_guests_allowed, :photos, :type_of_accomodation, :listing_distance
  
  has_many :bookings

  def listing_distance
    self.object.distance_between(instance_options[:latitude], instance_options[:longitude])
  end

  def planet_name
    Planet.find(object.planet_id).name
  end

  def listing_owner
    "#{self.object.owner.first_name} #{self.object.owner.last_name}"
  end

end
