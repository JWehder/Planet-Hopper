class BookingsMailer < ApplicationMailer
    default :from => "ejwehder@zohomail.com"

    def welcome_email(user)
        @user = user
        mail(:to => user.email, :subject => "Welcome to PlanetHopper, #{user.first_name}!")
    end
end
