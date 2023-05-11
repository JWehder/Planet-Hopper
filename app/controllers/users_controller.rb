class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response("User")

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = User.find(session[:user_id])
        render json: user, methods: [:unique_movies], status: :ok
    end

    def update
        user = User.find(session[:user_id])
        user.update!(user_params)
        render json: user, status: :ok
    end

    def forgot_password
        user = User.find_by(email: params[:email])
        if user 
            PasswordResetMailer.password_reset(user).deliver_now
            render json: { status: "All good" }, status: :ok 
        else
            render json: { errors: "Email not found" }, status: :not_found
        end
    end

    def reset_password
        user = User.find_by(email: params[:email])
        if params[:code].nil?
            render json: { error: "code is blank" }, status: :unauthorized
        else
            correct_code = user.code == params[:code]
            if correct_code && user.request_time <= 2.hours.ago
                # session[:user_id] = user.id
                # render json: user.id, status: :ok
                render json: { notice: "user authenticated" }, status: :ok
            else
                render json: { error: "Code is incorrect or has expired" }, status: :unauthorized
            end
        end
    end

    private 

    def 

end
