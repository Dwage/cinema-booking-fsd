import React from 'react'
import styles from './Seat.module.scss'

export type SeatStatus = 'available' | 'booked' | 'selected'

interface SeatProps {
  seatNumber: number
  status: SeatStatus
  price: number
  onClick: (seatNumber: number) => void
}

export const Seat: React.FC<SeatProps> = React.memo(
  ({ seatNumber, status, price, onClick }) => {
    const handleClick = () => {
      if (status === 'available' || status === 'selected') {
        onClick(seatNumber)
      }
    }

    const seatClasses = [styles.seat, styles[status]].join(' ')

    const seatTitle =
      status !== 'booked'
        ? `Seat ${seatNumber} - Price: ${price}`
        : `Seat ${seatNumber} - Booked`

    return (
      <button
        type="button"
        className={seatClasses}
        onClick={handleClick}
        disabled={status === 'booked'}
        title={seatTitle}
        aria-label={seatTitle}
      >
        {seatNumber}
      </button>
    )
  }
)
