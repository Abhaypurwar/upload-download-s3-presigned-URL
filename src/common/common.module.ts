import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonController } from './common.controller';
import { S3Service } from 'src/provider/bucket/s3service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CommonController],
  providers: [S3Service],
})
export class CommonModule {}
