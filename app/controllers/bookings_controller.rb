class BookingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: -> () { render_not_found_response("Booking") }
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    
    def create
        user = current_user
        booking = user.bookings.create!(booking_params)
        # find the number of days stayed minus checkout day
        # booking.update_column(price: booking.determine_price)
        booking.book_dates
        # booking.update_column(fees: booking.add_fees)
        # BookingsMailer.welcome_email(booking, booking.user).deliver_now
        render json: booking, status: :created
    end

    def show
        user = current_user
        booking = find_booking(user)
        if booking
            render json: booking, status: :ok
        else
            render_unauthorized_user_response("booking")
        end
    end

    def update
        user = current_user
        booking = find_booking(user) 
        if booking
            booking.update!(booking_params)
            render json: booking, status: :ok
        else
            render_unauthorized_user_response("booking")
        end
    end

    def destroy
        user = current_user
        booking = find_booking(user)
        if booking
            booking.destroy
            head :no_content
        else
            render_unauthorized_user_response("booking")
        end
    end

    private

    def find_booking(user)
        user.bookings.find(params[:id])
    end

    def current_user
        User.find(session[:user_id])
    end

    def booking_params
        parsed_params = params.permit(:user_id, :listing_id, :start_date, :end_date, :number_of_guests, :fees, :price)
        # params.permit(:user_id, :listing_id, :start_date, :end_date, :number_of_guests)
        parsed_params[:start_date] = Date.parse(parsed_params[:start_date])
        parsed_params[:end_date] = Date.parse(parsed_params[:end_date])
        parsed_params
    end
end
