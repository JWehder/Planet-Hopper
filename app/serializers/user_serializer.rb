class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :bio, :email, :profile_picture
end
