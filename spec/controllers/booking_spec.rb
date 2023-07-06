require 'rails_helper'

RSpec.describe BookingsController, type: :controller do
  describe '#update' do
    let(:user) { create(:user) }
    let(:booking) { create(:booking, user: user) }

    context 'when the booking exists' do
      context 'when the updated date range is greater than the existing date range' do
        let(:booking_params) do
          {
            start_date: booking.start_date,
            end_date: booking.end_date + 1.day
          }
        end

        it 'updates the booking' do
          put :update, params: { id: booking.id, booking: booking_params }
          expect(response).to have_http_status(:ok)
          expect(booking.reload.start_date).to eq(booking_params[:start_date])
          expect(booking.reload.end_date).to eq(booking_params[:end_date])
        end

        it 'creates new booked dates for the additional dates' do
          expect {
            put :update, params: { id: booking.id, booking: booking_params }
          }.to change { BookedDate.where(booking_id: booking.id).count }.by(1)
        end
      end

      context 'when the updated date range is smaller than the existing date range' do
        let(:booking_params) do
          {
            start_date: booking.start_date + 1.day,
            end_date: booking.end_date - 1.day
          }
        end

        it 'updates the booking' do
          put :update, params: { id: booking.id, booking: booking_params }
          expect(response).to have_http_status(:ok)
          expect(booking.reload.start_date).to eq(booking_params[:start_date])
          expect(booking.reload.end_date).to eq(booking_params[:end_date])
        end

        it 'deletes booked dates not within the updated date range' do
          expect {
            put :update, params: { id: booking.id, booking: booking_params }
          }.to change { BookedDate.where(booking_id: booking.id).count }.by(-1)
        end
      end
    end

    context 'when the booking does not exist' do
      it 'returns an unauthorized response' do
        put :update, params: { id: 9999, booking: { start_date: Date.today, end_date: Date.today + 1.day } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end