class AddStreetAddressToListing < ActiveRecord::Migration[6.1]
  def change
    add_column :listings, :address, :string
  end
end
