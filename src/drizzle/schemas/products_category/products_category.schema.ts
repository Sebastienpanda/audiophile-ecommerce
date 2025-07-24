import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { products } from '@drizzle/schemas/products/products.schema';
import { relations } from 'drizzle-orm';

export const productCategoryImages = pgTable('product_category_images', {
    id: uuid().defaultRandom().primaryKey(),
    product_id: uuid()
        .notNull()
        .references(() => products.id),
    mobile: text().notNull(),
    tablet: text().notNull(),
    desktop: text().notNull(),
});

export const productCategoryImagesRelations = relations(
    productCategoryImages,
    ({ one }) => ({
        product: one(products, {
            fields: [productCategoryImages.product_id],
            references: [products.id],
        }),
    }),
);
