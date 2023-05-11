class BookingsMailer < ApplicationMailer
    default :from => "ejwehder@zohomail.com"

    def welcome_email(booking, user)
        @user = user
        @booking = booking
        mail(:to => user.email, :subject => "Your PlanetHopper Booking Receipt# ")
    end
end
