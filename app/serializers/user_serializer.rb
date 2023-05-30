class UserSerializer < ActiveModel::Serializer
  attributes :first_name, :last_name, :username, :bio, :email, :profile_picture, :host
end
