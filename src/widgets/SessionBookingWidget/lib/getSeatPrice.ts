export const getSeatPrice = (seatNumber: number, basePrice: number): number => {
  if (seatNumber >= 1 && seatNumber <= 50) {
    return Math.round(basePrice * 2.0)
  } else if (seatNumber >= 51 && seatNumber <= 150) {
    return Math.round(basePrice * 1.5)
  } else if (seatNumber >= 151 && seatNumber <= 200) {
    return Math.round(basePrice * 1.0)
  } else {
    console.warn(`Invalid seat number for price calculation: ${seatNumber}`)
    return basePrice
  }
}
