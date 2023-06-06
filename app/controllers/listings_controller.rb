class ListingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: -> () { render_not_found_response("Listing") }
    skip_before_action :authorize, only: [:index, :render_homepage_listings]

    def index
        render json: Listing.all, status: :ok
    end

    def render_homepage_listings
        users_location_listings = []
        if listing_params[:latitude] > 0 && listing_params[:longitude] > 0
            users_location_listings = Listing.query_users_listings(listing_params[:longitude], listing_params[:latitude])
        end
        homepage_listings = Listing.where(city: ["New York", "Los Angeles", "Nashville-Davidson"])
        render json: homepage_listings, status: :ok, each_serializer: CustomListingSerializer
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
        render json: listing, status: :created
    end

    def show
        user = User.find(session[:user_id])
        listing = find_listing(user)
        if listing
            render json: listing, status: :ok, serializer: CustomListingSerializer
        else
            render_unauthorized_user_response("listing")
        end
    end

    def update
        user = User.find(session[:user_id])
        listing = find_listing(user) 
        if listing
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
        params.permit(:name, :city, :state_province, :country, :planet_id, :owner_id, :description, :unit_price, :type_of_accomodation, :max_guests_allowed, :longitude, :latitude, :street_address, :date, :guests, :search_value, photos: [])
    end
end
