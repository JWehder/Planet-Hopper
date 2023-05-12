class PlanetsController < ApplicationController
    def index
        planets = Planets.all
        render json: planets
    end

end
