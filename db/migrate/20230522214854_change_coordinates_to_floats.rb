class ChangeCoordinatesToFloats < ActiveRecord::Migration[6.1]
  def change
    change_column :listings, :longitude, :float
    change_column :listings, :latitude, :float
  end
end
