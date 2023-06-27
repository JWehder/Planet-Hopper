class BookedDate < ApplicationRecord
    belongs_to :listing
    belongs_to :booking
    
    validates :date, presence: true

end
