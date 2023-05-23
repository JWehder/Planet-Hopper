class AddStreetAddressToListing < ActiveRecord::Migration[6.1]
  def change
    add_column :listings, :street_address, :string
  end
end
