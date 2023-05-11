class BookingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response("Booking")

    def create
        booking = Booking.create!(booking_params)
        # find the number of days stayed minus checkout day
        number_of_days = (booking_params[:start_date] - booking_params[:end_date]).to_i + 1
        booking.price = number_of_days * booking.listing.unit_price
        BookingsMailer.booked_listing_email(booking, booking.user).deliver_now
        render json: booking, status: :created
    end

    def show
        booking = find_booking
        render json: booking, status: :ok
    end

    def update
        booking = find_booking
        booking.update!(booking_params)
        render json: booking, status: :ok
    end

    def destroy
        booking = find_booking
        booking.destroy
    end


    private

    def find_booking
        Booking.find(params[:id])
    end

    def booking_params
        parsed_params = params.permit(:user_id, :listing_id, :start_date, :end_date, :number_of_guests)
        parsed_params[:start_date] = Datetime.parse(parsed_params[:start_date])
        parsed_params[:end_date] = Datetime.parse(parsed_params[:end_date])
        parsed_params
    end

end
