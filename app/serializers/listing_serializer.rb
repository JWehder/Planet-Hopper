class ListingSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state_province, :country, :planet_id, :user_id, :description, :unit_price
end
