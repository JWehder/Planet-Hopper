class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.string :password_digest
      t.string :code
      t.datetime :request_time
      t.string :bio
      t.string :email
      t.string :profile_picture
      t.boolean :host

      t.timestamps
    end
  end
end
