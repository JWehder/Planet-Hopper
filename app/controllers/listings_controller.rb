class ListingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: -> () { render_not_found_response("Listing") }
    skip_before_action :authorize, only: [:index, :suggested_listings, :alien_listings, :show]
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def suggested_listings
        users_location_listings = []
        if listing_params[:latitude] && listing_params[:latitude] > 0 && listing_params[:longitude] > 0
            users_location_listings = Listing.query_users_listings(listing_params[:longitude], listing_params[:latitude])
        end
        homepage_listings = Listing.query_homepage_listings(listing_params[:latitude], listing_params[:longitude])
        render json: homepage_listings, status: :ok, methods: [:query_types_of_accomodations], latitude: listing_params[:latitude], longitude: listing_params[:longitude]
    end

    def search
        search_results = Listing.query_listing(listing_params[:latitude], listing_params[:longitude], listing_params[:start_date], listing_params[:end_date], listing_params[:guests])
        if listing_params[:start_date] >= listing_params[:end_date]
            render json: { error: "Start date must be before end date"}, status: :bad_request
        else
            if search_results.length > 0
                render json: search_results, status: :ok
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

    def create
        user = User.find(session[:user_id])
        listing = user.listings.create!(listing_params)
        render json: listing, status: :created
    end

    def show
        listing = Listing.find(listing_params[:id])
        # user = User.find(session[:user_id])
        # listing = find_listing(user)
        if listing
            render json: listing, status: :ok, serializer: CustomListingSerializer, latitude: session[:latitude], longitude: session[:longitude]
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
        params.permit(:id, :name, :city, :state_province, :country, :planet_id, :owner_id, :description, :unit_price, :type_of_accomodation, :max_guests_allowed, :longitude, :latitude, :address, :date, :start_date, :end_date, :guests, photos: [])
    end
end
