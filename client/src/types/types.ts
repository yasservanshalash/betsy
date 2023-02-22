export type Product = {
    _id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    description: string;
    quantity: number;
    seller: string;
}

export type User = {
    name: string;
    email: string;
    isAdmin: boolean;
    _id: string;

}