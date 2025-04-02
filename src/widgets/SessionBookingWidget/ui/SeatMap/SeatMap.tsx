import React, { useMemo } from 'react'
import { Seat, SeatStatus } from '../Seat'
import { getSeatPrice } from '../../lib/getSeatPrice'

interface SeatMapProps {
  rows: number
  seatsPerRow: number
  bookedSeats: number[]
  selectedSeats: number[]
  basePrice: number
  onToggleSeat: (seatNumber: number, price: number) => void
}

export const SeatMap: React.FC<SeatMapProps> = ({
  rows,
  seatsPerRow,
  bookedSeats,
  selectedSeats,
  basePrice,
  onToggleSeat,
}) => {
  const bookedSet = useMemo(() => new Set(bookedSeats), [bookedSeats])
  const selectedSet = useMemo(() => new Set(selectedSeats), [selectedSeats])

  const handleSeatClick = (seatNumber: number) => {
    const price = getSeatPrice(seatNumber, basePrice)
    onToggleSeat(seatNumber, price)
  }

  const renderSeats = () => {
    const seatElements = []
    for (let row = 0; row < rows; row++) {
      for (let seatIndex = 0; seatIndex < seatsPerRow; seatIndex++) {
        const seatNumber = row * seatsPerRow + seatIndex + 1
        let status: SeatStatus = 'available'

        if (bookedSet.has(seatNumber)) {
          status = 'booked'
        } else if (selectedSet.has(seatNumber)) {
          status = 'selected'
        }

        const price = getSeatPrice(seatNumber, basePrice)

        seatElements.push(
          <Seat
            key={seatNumber}
            seatNumber={seatNumber}
            status={status}
            price={price}
            onClick={handleSeatClick}
          />
        )
      }
    }
    return seatElements
  }

  return (
    <div>
      <div>SCREEN</div>
      <div
        style={{
          gridTemplateColumns: `repeat(${seatsPerRow}, auto)`,
        }}
      >
        {renderSeats()}
      </div>
    </div>
  )
}
