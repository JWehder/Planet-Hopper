class RenameStreetAddressToAddressInListings < ActiveRecord::Migration[6.1]
  def change
    rename_column :listings, :street_address, :address
  end
end
