class DeleteAgeFromPlanets < ActiveRecord::Migration[6.1]
  def change
    remove_column :planets, :age
  end
end
