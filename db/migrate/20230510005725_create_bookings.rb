class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|
      t.integer :user_id
      t.integer :listing_id
      t.datetime :start_date
      t.datetime :end_date
      t.integer :price
      t.integer :number_of_guests

      t.timestamps
    end
  end
end
