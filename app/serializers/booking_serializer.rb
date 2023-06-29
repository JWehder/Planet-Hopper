class BookingSerializer < ActiveModel::Serializer
  attributes :start_date, :end_date, :price, :number_of_guests, :fees, :listing_id

  has_many :booked_dates
end
