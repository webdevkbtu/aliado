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
  stock: number;
  image: ImageBitmap;
}

export interface IOrder {
  id: number;
  orderDate: Date;
  userID: number;
  items: number[];
}

export interface IAuthResponse {
  token: string;
  isStaff: boolean;
  username: string;
}


