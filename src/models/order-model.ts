export interface OrderItem {
  productId: number;
  productName: string;
  productPrice: number;
  qty: number;
  subTotal: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  totalPrice: number;
}

export const orders: Order[] = [];
