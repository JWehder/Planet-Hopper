class CreateListings < ActiveRecord::Migration[6.1]
  def change
    create_table :listings do |t|
      t.string :name
      t.string :city
      t.string :state_province
      t.string :country
      t.integer :planet_id
      t.integer :user_id
      t.string :description
      t.integer :unit_price

      t.timestamps
    end
  end
end
