class MaxGuestsAllowed < ActiveRecord::Migration[6.1]
  def change
    add_column :listings, :max_guests_allowed, :integer
  end
end
