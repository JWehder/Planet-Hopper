class CustomBookingsSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :price, :number_of_guests, :fees, :listing_id, :listing_owner

  belongs_to :listing

  def listing_owner 
    "#{self.object.listing.owner.first_name} #{self.object.listing.owner.last_name}"
  end

end
