import { Injectable } from '@nestjs/common';
import { DrizzleService } from '@drizzle/drizzle.service';

@Injectable()
export class ProductsService {
    constructor(private readonly drizzleService: DrizzleService) {}

    async getProductsByCategorySlug(slug: string) {
        const category = await this.drizzleService.db.query.category.findFirst({
            where: (c, { eq }) => eq(c.name, slug),
            with: {
                products: {
                    with: {
                        categoryImage: true,
                        galleryImages: true,
                    },
                },
            },
        });

        return category?.products ?? null;
    }

    async getProductInCategory(categorySlug: string, productSlug: string) {
        const category = await this.drizzleService.db.query.category.findFirst({
            where: (c, { eq }) => eq(c.name, categorySlug),
            with: {
                products: {
                    where: (p, { eq }) => eq(p.slug, productSlug),
                    with: {
                        categoryImage: true,
                        galleryImages: true,
                    },
                },
            },
        });

        const product = category?.products?.[0];
        return product ?? null;
    }
}
