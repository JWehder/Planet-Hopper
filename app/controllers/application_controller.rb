class ApplicationController < ActionController::API
  include ActionController::Cookies
  wrap_parameters false
  before_action :authorize
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  private

  def render_unprocessable_entity(invalid) 
    render json: { errors: invalid.record.errors }, status: :unprocessable_entity
  end

  def authorize
    render json: { error: "not authorized" }, status: :unauthorized unless session.include? :user_id
  end

  def render_unauthorized_user_response(model_name)
    render json: {error: "You are unauthorized to alter this #{model_name}"}, status: :unauthorized
  end

  def render_not_found_response(model_name)
    render json: { error: ["#{model_name} not found"]}, status: :not_found
  end

end
