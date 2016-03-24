Rails.application.routes.draw do
  root 'pages#home'

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :ideas, only: [:index, :create, :update, :destroy] do
        patch '/vote',   to: "ideas/voter#update"
      end

      resources :tags, only: [:index]
    end
  end
end
