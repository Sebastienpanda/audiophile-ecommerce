import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';

@Module({
    providers: [MinioService],
    controllers: [MinioController],
})
export class MinioModule {}
