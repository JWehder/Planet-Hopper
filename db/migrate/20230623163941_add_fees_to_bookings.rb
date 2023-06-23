class AddFeesToBookings < ActiveRecord::Migration[6.1]
  def change
    add_column :bookings, :fees, :float
  end
end
