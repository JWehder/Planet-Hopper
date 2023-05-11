class AddReceiptToBookings < ActiveRecord::Migration[6.1]
  def change
    add_column :bookings, :receipt_number, :string
  end
end
