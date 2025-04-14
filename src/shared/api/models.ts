export interface LoginDto {
  username: string;
  password?: string;
}

interface OrderSeatInfoEntity {
  seatNumber: number;
  price: number;
}
interface OrderContactInfoEntity {
  name: string;
  email: string;
  phone: string;
}
export interface Order {
  id: number;
  sessionId: string;
  selectedSeats: OrderSeatInfoEntity[];
  totalAmount: number;
  contactInfo: OrderContactInfoEntity;
  orderTimestamp: string;
}
