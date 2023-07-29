class BookedDate < ApplicationRecord
    belongs_to :listing
    belongs_to :booking
    
    validates :date, presence: true
    validates_uniqueness_of :date, scope: :listing_id
end
