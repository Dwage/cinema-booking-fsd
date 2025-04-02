import { API_BASE_URL } from '@/shared/config/api'
import type { Order, OrderPayload } from '../model/types'

export const submitOrder = async (orderData: OrderPayload): Promise<Order> => {
  const url = `${API_BASE_URL}/orders`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText || ''}`
      )
    }

    const createdOrder: Order = await response.json()
    return createdOrder
  } catch (error) {
    console.error('Failed to submit order:', error)
    throw error
  }
}
