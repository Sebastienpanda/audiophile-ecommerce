import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { products } from '@drizzle/schemas/products/products.schema';
import { relations } from 'drizzle-orm';

export const productGalleryImages = pgTable('product_gallery_images', {
    id: uuid().defaultRandom().primaryKey(),
    product_id: uuid()
        .notNull()
        .references(() => products.id),
    position: integer().notNull(),
    mobile: text().notNull(),
    tablet: text().notNull(),
    desktop: text().notNull(),
});

export const productGalleryImagesRelations = relations(
    productGalleryImages,
    ({ one }) => ({
        product: one(products, {
            fields: [productGalleryImages.product_id],
            references: [products.id],
        }),
    }),
);
