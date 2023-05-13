Rails.application.routes.draw do
  
  resources :booked_dates
  resources :bookings, only: [:index, :create, :show, :update, :destroy]
  resources :listings, only: [:index, :create, :show, :update, :destroy]
  resources :users, only: [:create, :update, :destroy]
  resources :planets, only: [:index]
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/forgot_password", to: "users#forgot_password"
  post "/reset_password", to: "users#reset_password"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
