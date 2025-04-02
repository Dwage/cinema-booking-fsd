export interface OrderSeatInfo {
  seatNumber: number
  price: number
}

export interface OrderContactInfo {
  name: string
  email: string
  phone: string
}

export interface OrderPayload {
  sessionId: string
  selectedSeats: OrderSeatInfo[]
  totalAmount: number
  contactInfo: OrderContactInfo
  orderTimestamp: string
}

export interface Order extends OrderPayload {
  id: number | string
}
