class ListingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: -> () { render_not_found_response("Listing") }
    skip_before_action :authorize, only: [:index, :suggested_listings, :alien_listings, :show, :search]
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def suggested_listings
        homepage_listings = Listing.query_homepage_listings(listing_params[:users_latitude], listing_params[:users_longitude])
        render json: homepage_listings, status: :ok, latitude: listing_params[:users_latitude], longitude: listing_params[:users_longitude]
    end

    def search
        search_results = Listing.query_listing(listing_params)
        if listing_params[:start_date] >= listing_params[:end_date]
            render json: { error: "Start date must be before end date"}, status: :bad_request
        else
            if search_results.length > 0
                render json: search_results, status: :ok, latitude: listing_params[:users_latitude], longitude: listing_params[:users_longitude]
            else 
                render json: { error: "No results were found, please try again." }, status: :not_found
            end
        end
    end

    def my_listings
        user = User.find(session[:user_id])
        unique_listings = user.listings.uniq
        render json: unique_listings, status: :ok, each_serializer: CustomListingSerializer
    end

    def alien_listings
        listings = Listing.where.not(planet_id: 6)
        render json: listings, status: :ok
    end

    def show
        listing = Listing.find(listing_params[:id])
        if listing
            render json: listing, status: :ok, serializer: CustomListingSerializer, latitude: session[:latitude], longitude: session[:longitude]
        else
            render_unauthorized_user_response("listing")
        end
    end

    private

    def find_listing(user)
        user.listings.find_by(id: params[:id])
    end

    def listing_params
        params.permit(:id, :longitude, :latitude, :address, :date, :start_date, :end_date, :guests, :users_longitude, :users_latitude)
    end
end
