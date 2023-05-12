class ListingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response("Listing")
    skip_before_action :authorize, only: [:index]

    def index
        listings = Listing.all
        render json: listings
    end

    def create
        user = current_user
        listing = user.listings.create!(listing_params)
        listing.owner_id = user.id
        render json: listing, status: :created
    end

    def show
        user = current_user
        listing = find_listing(user)
        if listing
            render json: listing, status: :ok
        else
            render_unauthorized_user_response("listing")
        end
    end

    def update
        user = current_user
        listing = find_listing(user) 
        if booking
            listing.update!(listing_params)
            render json: listing, status: :ok
        else
            render_unauthorized_user_response("listing")
        end
    end

    end

    def destroy
        user = current_user
        listing = find_listing(user)
        if listing
            listing.destroy
            head :no_content
        else
            render_unauthorized_user_response("listing")
        end
    end 

    private

    def find_listing(user)
        user.listings.find_by(id: params[:id])
    end

    def listing_params
        params.permit(:name, :city, :state_province, :country, :planet_id, :user_id, :description, :unit_price, :type_of_accomodation)
    end
end
