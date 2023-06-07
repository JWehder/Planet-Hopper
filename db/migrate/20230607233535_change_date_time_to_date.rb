class ChangeDateTimeToDate < ActiveRecord::Migration[6.1]
  def up
    remove_foreign_key :booked_dates, :bookings
    remove_foreign_key :booked_dates, :listings

    change_column :bookings, :start_date, :date
    change_column :bookings, :end_date, :date
    change_column :booked_dates, :date, :date

    add_foreign_key :booked_dates, :bookings
    add_foreign_key :booked_dates, :listings
  end

  def down
    remove_foreign_key :booked_dates, :bookings
    remove_foreign_key :booked_dates, :listings

    change_column :bookings, :start_date, :datetime
    change_column :bookings, :end_date, :datetime
    change_column :booked_dates, :date, :datetime

    add_foreign_key :booked_dates, :bookings
    add_foreign_key :booked_dates, :listings
  end
end
