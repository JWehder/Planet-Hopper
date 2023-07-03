class BookingSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :price, :number_of_guests, :fees, :listing_id, :listing_owner, :stringified_dates

  def stringified_dates
    booked_dates = self.object.booked_dates.map { |booked_date| booked_date.date.strftime('%Y-%m-%d') }
    booked_dates
  end

  def listing_owner 
    user = User.find(self.object.listing.owner_id)
    "#{self.object.user.first_name} #{self.object.user.last_name}"
  end

end
