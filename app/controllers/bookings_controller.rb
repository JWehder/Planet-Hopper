class BookingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response("Booking")

    def create
        user = Booking.create!(booking_params)
        render json: booking, status: :created
    end

    def show
        booking = find_booking
        render json: booking, status: :ok
    end

    def update
        user = find_booking
        user.update!(user_params)
        render json: user, status: :ok
    end

    private

    def find_booking
        Booking.find(params[:id])
    end

end
