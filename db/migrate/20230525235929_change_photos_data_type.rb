class ChangePhotosDataType < ActiveRecord::Migration[6.1]
  def up
    change_table :listings do |t|
      t.change :photos, :string, array: true, default: [], using: "(string_to_array(photos, ','))"
    end
  end
end
