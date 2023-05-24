class ListingSerializer < ActiveModel::Serializer
  attributes :name, :city, :state_province, :country, :planet_id, :user_id, :description, :unit_price, :type_of_accomodation, :max_guests_allowed, :photos, :longitude, :latitude, :street_address
end
