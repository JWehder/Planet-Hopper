class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :password_digest, :code, :request_time, :bio, :email, :profile_picture, :host
end
