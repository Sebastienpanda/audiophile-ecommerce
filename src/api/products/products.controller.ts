import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('category/:slug')
    async getByCategory(@Param('slug') slug: string) {
        const products =
            await this.productsService.getProductsByCategorySlug(slug);
        if (!products) {
            throw new NotFoundException(
                `Aucun produit trouvé pour la catégorie '${slug}'`,
            );
        }
        return products;
    }

    @Get('category/:categorySlug/:productSlug')
    async getProductInCategory(
        @Param('categorySlug') categorySlug: string,
        @Param('productSlug') productSlug: string,
    ) {
        const product = await this.productsService.getProductInCategory(
            categorySlug,
            productSlug,
        );
        if (!product) {
            throw new NotFoundException(
                `Produit '${productSlug}' introuvable dans la catégorie '${categorySlug}'`,
            );
        }
        return product;
    }
}
