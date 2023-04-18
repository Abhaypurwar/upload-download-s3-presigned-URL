import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PreSignedUrlDto } from './dto/common.dto';
import { S3Service } from 'src/provider/bucket/s3service';

@ApiTags('Upload and download on S3')
@Controller('/')
export class CommonController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('/preSignedUrlViaPut')
  @ApiOperation({ summary: 'API to generate preSigned URL using put Object type' })
  async getSignedUrl(@Body() preSignedUrlDto: PreSignedUrlDto, @Res() res: Response) {
    try {
      const presignedS3Url = await this.s3Service.getPreSignedUrlByPut(preSignedUrlDto);
      res.status(200).send(presignedS3Url);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Post('/presignedUrlViaPost')
  @ApiOperation({ summary: 'API to generate preSigned URL using post method' })
  async preSignedLinkPost(@Body() preSignedUrlDto: PreSignedUrlDto, @Res() res: Response) {
    try {
      const url = await this.s3Service.getPreSignedUrl(preSignedUrlDto);
      res.status(200).send(url);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Get('/getUploadedFileUrl')
  @ApiOperation({ summary: 'API to generate public URL to download/get File' })
  async getUploadedFile(@Body() preSignedUrlDto: PreSignedUrlDto, @Res() res: Response) {
    try {
      const uploadedFileS3Url = await this.s3Service.getUploadedFile(preSignedUrlDto);
      res.status(200).send(uploadedFileS3Url);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
