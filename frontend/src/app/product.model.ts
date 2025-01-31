export interface Product {
    pId: string;
    pName: string;
    price: string;
    quantity: string;
    category: string;
    isPremium: string;
}

export interface ProductToAdd {
    pId: number;
    pName: string;
    price: number;
    quantity: number;
    category: string;
    isPremium: boolean;
}