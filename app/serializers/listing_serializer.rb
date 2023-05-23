class ListingSerializer < ActiveModel::Serializer
  attributes :test, :name, :city, :state_province, :country, :planet_id, :user_id, :description, :unit_price

  def test
    byebug
  end
end
