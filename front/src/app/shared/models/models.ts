export interface ICategory {
  id: number;
  categoryName: string;
  categoryDescription: string;
}

export interface IProduct {
  id: number;
  itemName: string;
  itemDescription: string;
  buyingPrice: number;
  sellingPrice: number;
  category: number;
  stock: number;
}

export interface IOrder {
  id: number;
  date: Date;
  address: string;
  kind: string;
}
