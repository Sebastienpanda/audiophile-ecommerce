import { Injectable } from '@nestjs/common';
import {
    ListObjectsV2Command,
    S3Client,
    S3ClientConfig,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
    private readonly s3Client: S3Client;
    private readonly bucketName = 'audiophile';

    constructor(private readonly configService: ConfigService) {
        const s3Config: S3ClientConfig = {
            endpoint: this.configService.getOrThrow<string>('STORAGE_URL'),
            region: 'eu-west-1',
            forcePathStyle: true,
            credentials: {
                accessKeyId:
                    this.configService.getOrThrow<string>('MINIO_USER'),
                secretAccessKey:
                    this.configService.getOrThrow<string>('MINIO_PASSWORD'),
            },
        };

        this.s3Client = new S3Client(s3Config);
    }

    async listPublicImages(): Promise<
        Array<{ key: string; url: string; size?: number; lastModified?: Date }>
    > {
        const result = await this.s3Client.send(
            new ListObjectsV2Command({ Bucket: this.bucketName }),
        );

        const contents = result.Contents ?? [];

        return contents.map((item) => ({
            key: item.Key!,
            url: `https://storage-api.sebastien-dev.fr/${this.bucketName}/${encodeURIComponent(item.Key!)}`,
            size: item.Size,
            lastModified: item.LastModified,
        }));
    }
}
