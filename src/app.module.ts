import { Module } from '@nestjs/common';
import { DrizzleModule } from '@drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from './minio/minio.module';
import { ProductsModule } from './api/products/products.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DrizzleModule,
        MinioModule,
        ProductsModule,
    ],
})
export class AppModule {}
