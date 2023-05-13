class BookedDateSerializer < ActiveModel::Serializer
  attributes :id, :booking_id, :listing_id, :date
end
