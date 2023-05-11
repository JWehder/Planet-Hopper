class BookingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response("Booking")

end
