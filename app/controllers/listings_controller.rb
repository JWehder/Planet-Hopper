class ListingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: -> () { render_not_found_response("Listing") }
    skip_before_action :authorize, only: [:index, :render_homepage_listings]

    def render_homepage_listings
        if listing_params[:latitude] && listing_params[:longitude]
            users_location_listings = Listing.query_users_listings(params[:longitude], params[:latitude])
        else
            users_location_listings = []
        end
        byebug
        render json: { 
            users_location_listings: users_location_listings,
            new_york: Listing.query_city_listings("New York"),
            los_angeles: Listing.query_city_listings("Los Angeles"),
            nashville: Listing.query_city_listings("Nashville-Davidson"),
            types_of_accomodations: Listing.query_types_of_accomodations
        }
        byebug
    end

    def search
        search_results = Listing.query_listing(listing_params[:search_value], listing_params[:date], listing_params[:guests])
        if search_results > 0
            render json: search_results, status: :ok
        else 
            render json: { error: "No results were found, please try again." }, status: :not_found
        end
    end

    def create
        user = User.find(session[:user_id])
        listing = user.listings.create!(listing_params)
        listing.owner_id = user.id
        render json: listing, status: :created
    end

    def show
        user = User.find(session[:user_id])
        listing = find_listing(user)
        if listing
            render json: listing, status: :ok
        else
            render_unauthorized_user_response("listing")
        end
    end

    def update
        user = User.find(session[:user_id])
        listing = find_listing(user) 
        if booking
            listing.update!(listing_params)
            render json: listing, status: :ok
        else
            render_unauthorized_user_response("listing")
        end
    end

    def destroy
        user = User.find(session[:user_id])
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
        params.permit(:name, :city, :state_province, :country, :planet_id, :user_id, :description, :unit_price, :type_of_accomodation, :max_guests_allowed, :photos, :longitude, :latitude, :street_address, :date, :guests, :search_value)
    end
end
