class BookingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :listing_id, :start_date, :end_date, :price, :number_of_guests
end
