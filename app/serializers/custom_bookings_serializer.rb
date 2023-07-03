class CustomBookingsSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :price, :number_of_guests, :fees, :listing_id, :listing_owner

  belongs_to :listing

  def listing_booked_dates
      booked_dates = self.object.listing.booked_dates.map { |booked_date| booked_date.date.strftime('%Y-%m-%d') }
      booked_dates
  end

  def listing_owner 
    "#{self.object.listing.owner.first_name} #{self.object.listing.owner.last_name}"
  end

end
