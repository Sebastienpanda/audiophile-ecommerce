import { Controller, Get } from '@nestjs/common';
import { MinioService } from './minio.service';

@Controller('images')
export class MinioController {
    constructor(private readonly minioService: MinioService) {}

    @Get('/all')
    async getAllImages() {
        return this.minioService.listPublicImages();
    }
}
