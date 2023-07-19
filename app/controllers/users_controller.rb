class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: -> () { render_not_found_response("User") }
    skip_before_action :authorize, only: [:create, :forgot_password, :reset_password, :show, :find_user_by_email]

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = find_user_by_sessionID
        render json: user, status: :ok
    end

    def update
        user = find_user_by_sessionID
        user.update!(user_params)
        render json: user, status: :ok
    end

    def forgot_password
        user = find_user_by_email
        if user 
            begin
                PasswordResetMailer.password_reset(user).deliver_now!
                render json: { status: "Email found" }, status: :ok 
            rescue StandardError => e
                render json: { error: e.inspect }, status: 500
            end
        else
            render json: { errors: "Email not found" }, status: :not_found
        end
    end

    def reset_password
        user = find_user_by_email
        if params[:code].nil?
            render json: { error: "Code is blank" }, status: :unauthorized
        else
            correct_code = user.code == params[:code]
            if correct_code && 2.hours.ago <= user.request_time && user.request_time <= Time.now.utc
                session[:user_id] = user.id
                # render json: user.id, status: :ok
                render json: { status: "Code is correct" }, status: :ok
            else
                render json: { error: "Code is incorrect or has expired" }, status: :unauthorized
            end
        end
    end

    private 

    def find_user_by_email
        User.find_by(email: params[:email])
    end

    def find_user_by_sessionID
        User.find(session[:user_id])
    end

    def user_params
        params.permit(:first_name, :last_name, :username, :email, :password, :password_confirmation, :bio, :code)
    end

end
