class CreatePlanets < ActiveRecord::Migration[6.1]
  def change
    create_table :planets do |t|
      t.string :name
      t.integer :age
      t.string :description

      t.timestamps
    end
  end
end
