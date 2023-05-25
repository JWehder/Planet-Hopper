class RemoveUserIdFromListings < ActiveRecord::Migration[6.1]
  def change
    remove_column :listings, :user_id
  end
end
