class CustomListingSerializer < ActiveModel::Serializer
  attributes :name, :city, :state_province, :country, :planet, :description, :unit_price, :type_of_accomodation, :max_guests_allowed, :photos, :longitude, :latitude, :address, :stringified_booked_dates
  # , :custom_method
  
  has_many :bookings
  has_many :booked_dates

  def stringified_booked_dates
    booked_dates = self.object.booked_dates.map { |booked_date| booked_date.date.strftime('%Y-%m-%d') }
    booked_dates
  end

  def distance_from_self
    object.distance_between([instance_options[:latitude], instance_options[:longitude]])
  end

  def planet
    Planet.find(self.object.planet_id).name
  end

  def listing_owner
    "#{self.object.owner.first_name} #{self.object.owner.last_name}"
  end

end
