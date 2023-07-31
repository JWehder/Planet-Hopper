class BookingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: -> () { render_not_found_response("Booking") }
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    
    def create
      booking = Booking.new(booking_params)
      price = booking.determine_price
      booking.price = price
      booking.fees = booking.add_fees(price)
    
      if booking.save!
        BookingsMailer.booking_email(booking, booking.user).deliver_now
        render json: booking, status: :created
      else
        render json: booking.errors, status: :unprocessable_entity
      end
    end

    def my_bookings
        user = current_user
        render json: user.bookings, each_serializer: CustomBookingsSerializer, status: :ok
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
          booking_date_range = (booking.start_date...booking.end_date)
          params_date_range = (booking_params[:start_date]...booking_params[:end_date])
      
          if booking_date_range.count < params_date_range.count
            booking.update!(booking_params)
            booking_date_range.each do |date|
              if booking.booked_dates.where(date: date).empty?
                booking.booked_dates.create!(listing_id: booking.listing_id, booking_id: booking.id, date: date)
              end
            end
          elsif booking_date_range.count > params_date_range.count
            booking.update!(booking_params)
            booking.booked_dates.where.not(date: booking_date_range).delete_all
          end
      
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
            render json: { id: booking.id }
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
        parsed_params = params.permit(:user_id, :listing_id, :start_date, :end_date, :number_of_guests)
        # params.permit(:user_id, :listing_id, :start_date, :end_date, :number_of_guests)
        parsed_params[:start_date] = Date.parse(parsed_params[:start_date])
        parsed_params[:end_date] = Date.parse(parsed_params[:end_date])
        parsed_params
    end
end
