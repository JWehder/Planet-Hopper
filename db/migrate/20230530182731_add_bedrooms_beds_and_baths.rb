class AddBedroomsBedsAndBaths < ActiveRecord::Migration[6.1]
  def change
    add_column :listings, :bedrooms, :integer
    add_column :listings, :beds, :integer
    add_column :listings, :bathrooms, :float
  end
end
