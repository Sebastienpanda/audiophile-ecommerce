import {
    boolean,
    integer,
    pgTable,
    text,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { category } from '@drizzle/schemas/category/category.schema';
import { productCategoryImages } from '@drizzle/schemas/products_category/products_category.schema';
import { productGalleryImages } from '@drizzle/schemas/products_gallery_images/products_gallery_images';

export const products = pgTable('products', {
    id: uuid().defaultRandom().primaryKey(),
    slug: varchar({ length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull().unique(),
    new: boolean().notNull().default(false),
    price: integer().notNull(),
    description: text().notNull(),
    features: text().notNull(),
    category_id: uuid()
        .notNull()
        .references(() => category.id),
    images_url: text().notNull(),
});

export const productRelations = relations(products, ({ one, many }) => ({
    category: one(category, {
        fields: [products.category_id],
        references: [category.id],
    }),
    categoryImage: one(productCategoryImages, {
        fields: [products.id],
        references: [productCategoryImages.product_id],
    }),
    galleryImages: many(productGalleryImages),
}));
