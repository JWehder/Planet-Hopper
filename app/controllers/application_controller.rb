class ApplicationController < ActionController::API
  include ActionController::Cookies
  wrap_parameters false
  before_action :authorize

  private

  def authorize
    render json: { error: "not authorized" }, status: :unauthorized unless session.include? :user_id
  end

  def render_not_found_response(model_name)
    render json: { error: ["#{model_name} not found"]}, status: :not_found
  end

end
