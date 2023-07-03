class ListingSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state_province, :country, :planet_name, :unit_price, :max_guests_allowed, :photos, :type_of_accomodation, :distance_from_user, :listing_owner, :latitude, :longitude, :owner, :stringified_dates

  def stringified_dates
    booked_dates = self.object.booked_dates.map { |booked_date| booked_date.date.strftime('%Y-%m-%d') }
    booked_dates
  end
  
  def distance_from_user
    self.object.distance_to([instance_options[:latitude], instance_options[:longitude]])
  end

  def planet_name
    Planet.find(object.planet_id).name
  end

  def listing_owner
    "#{self.object.owner.first_name} #{self.object.owner.last_name}"
  end

end
