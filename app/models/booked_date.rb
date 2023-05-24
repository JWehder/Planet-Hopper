class BookedDate < ApplicationRecord
    belongs_to :listing
    belongs_to :booking

    
end
