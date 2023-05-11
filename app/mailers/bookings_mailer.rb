class BookingsMailer < ApplicationMailer
    default :from => "ejwehder@zohomail.com"

    def welcome_email(booking, user)
        @user = user
        @booking = booking
        @receipt_number = generate_booking_receipt
        @planet = booking.listing.planet.name
        @type_of_accomodation = booking.listing.type_of_accomodation
        mail(:to => user.email, :subject => "Your Planet Hopper Booking Receipt# #{receipt_number} Summary")
    end

    def generate_booking_receipt
        receipt_number = SecureRandom.hex(8)
        @booking.update_column(receipt_number: receipt_number)

        receipt_number
    end

end
