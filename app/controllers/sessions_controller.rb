class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]
    rescue_from ActiveRecord::RecordNotFound, with: -> () { render_not_found_response("User") }
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def create
        user = User.find_by(username: session_params[:username])
        if user&.authenticate(session_params[:password])
            session[:user_id] = user.id 
            render json: user, methods: [:unique_movies], status: :created
        else
            render json: { errors: ["Username or Password is incorrect"] }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

    private

    def find_user
        user = User.find_by(id: session[:user_id])
    end

    def session_params
        params.permit(:username, :password)
    end
end
