export type Product = {
    _id?: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    description: string;
    quantity: number;
    seller?: string;
    brand: string;
    dateAdded?: string;
}

export type User = {
    name: string;
    email: string;
    isAdmin: boolean;
    _id: string;
    avatar: string;
}

export type Favorites = {
    _id: string;
    userId: string;
    products: Product[];
}

export type Cart = {
    _id: string;
    userId: string;
    products: Product[];
}

export type Order = {
    _id: string;
    userId: string;
    products: Product[];
}