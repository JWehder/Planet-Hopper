class RemoveFullAddress < ActiveRecord::Migration[6.1]
  def change
    remove_column :listings, :full_address
  end
end
