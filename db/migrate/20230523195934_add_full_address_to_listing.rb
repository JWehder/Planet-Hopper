class AddFullAddressToListing < ActiveRecord::Migration[6.1]
  def change
    add_column :listings, :full_address, :string
  end
end
