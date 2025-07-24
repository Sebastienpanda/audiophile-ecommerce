import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { products } from '@drizzle/schemas/products/products.schema';

export const category = pgTable('category', {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull().unique(),
});

export const categoryRelations = relations(category, ({ many }) => ({
    products: many(products),
}));
