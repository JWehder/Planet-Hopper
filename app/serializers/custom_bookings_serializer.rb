class CustomBookingsSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :price, :number_of_guests, :fees, :listing_id, :listing_owner

  belongs_to :listing

  def 

  def listing_owner 
    user = User.find(self.object.listing.owner_id)
    "#{self.object.user.first_name} #{self.object.user.last_name}"
  end

end
