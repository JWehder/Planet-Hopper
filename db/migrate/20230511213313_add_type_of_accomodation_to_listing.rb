class AddTypeOfAccomodationToListing < ActiveRecord::Migration[6.1]
  def change
    add_column :listings, :type_of_accomodation, :string
  end
end
