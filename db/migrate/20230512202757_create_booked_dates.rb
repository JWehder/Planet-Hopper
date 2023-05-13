class CreateBookedDates < ActiveRecord::Migration[6.1]
  def change
    create_table :booked_dates do |t|
      t.references :booking, null: false, foreign_key: true, index: true
      t.references :listing, null: false, foreign_key: true, index: true
      t.datetime :date, null: false, index: true

      t.timestamps
    end
  end
end
