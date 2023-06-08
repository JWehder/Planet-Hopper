class BookingSerializer < ActiveModel::Serializer
  attributes :start_date, :end_date, :price, :number_of_guests

  has_many :booked_dates
end
