class BookingSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :price, :number_of_guests, :fees, :listing_id, :stringified_dates, :user_id

  def stringified_dates
    booked_dates = self.object.booked_dates.map { |booked_date| booked_date.date.strftime('%Y-%m-%d') }
    booked_dates
  end

end
