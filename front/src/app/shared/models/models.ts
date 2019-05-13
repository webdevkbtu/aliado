export interface ICategory {
  id: number;
  categoryName: string;
  categoryDescription: string;
  image: ImageBitmap;
}

export interface IProduct {
  id: number;
  itemName: string;
  itemDescription: string;
  buyingPrice: number;
  sellingPrice: number;
  category: number;
  image: ImageBitmap;
}

export interface IOrder {
  id: number;
  orderDate: Date;
  shipDate: Date;
  arriveDate: Date;
  user: number;
  items: number[];
  supId: number;
  isOrder: boolean;
  deliveryMethod: number;
}

export interface ITransactions {
  id: number;
  orderId: number;
  cost: number;
  isOrder: boolean;
}

export interface ISuppliers {
  id: number;
  supName: string;
  address: string;
  phoneNum: number;
  city: number;
}

export interface IInventory {
  id: number;
  itemNum: number;
  stock: number;
}

export interface IAuthResponse {
  token: string;
  is_staff: boolean;
  username: string;
}

export interface IDeliveryMethod {
  id: number;
  methodDescription: string;
  avgDeliveryDays: number;
}
