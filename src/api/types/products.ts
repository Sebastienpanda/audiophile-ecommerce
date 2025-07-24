export interface Product {
    id: string;
    slug: string;
    name: string;
    category_id: string;
    new: boolean;
    price: number;
    description: string;
    features: string;
    images_url: string;
}

export interface ProductCategoryImage {
    id: number;
    productId: string;
    mobile: string;
    tablet: string;
    desktop: string;
}

export interface ProductGalleryImage {
    id: number;
    productId: string;
    position: number;
    mobile: string;
    tablet: string;
    desktop: string;
}
