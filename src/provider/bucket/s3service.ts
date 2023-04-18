import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { PreSignedUrlDto } from 'src/common/dto/common.dto';

@Injectable()
export class S3Service {
  private readonly client: S3;
  constructor() {
    this.client = new S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_KEY_SECRET,
      region: process.env.S3_REGION,
      signatureVersion: 'v4',
    });
  }

  /**
   * generate s3 presigned url via put Object type
   * @param file: signedUrlDto
   * @return url
   */
  public getPreSignedUrlByPut = async (signedUrlDto: PreSignedUrlDto) => {
    try {
      const presignedS3Url = await this.client.getSignedUrl('putObject', {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: signedUrlDto.key,
        Expires: 60 * 10,
      });
      return presignedS3Url;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  /**
   * generate s3 presigned url via createPresignedPost method
   * @param file: preSignedUrlDto
   * @return url
   */
  public getPreSignedUrl = async (preSignedUrlDto: PreSignedUrlDto) => {
    const presignedS3Url = this.client.createPresignedPost({
      Bucket: process.env.AWS_S3_BUCKET,
      Conditions: [
        ['content-length-range', 0, 1000000],
        // ['eq', '$userId', 'test'], extra parameter userId for more security purpose.
      ],
      Fields: {
        Key: preSignedUrlDto.key,
      },
      Expires: 30 * 60,
    });
    return presignedS3Url;
  };

  /**
   * get s3 public url to download the file
   * @param file: signedUrlDto
   * @return url
   */
  public getUploadedFile = async (signedUrlDto: PreSignedUrlDto) => {
    try {
      const getPublicUrl = await this.client.getSignedUrl('getObject', {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: signedUrlDto.key,
        Expires: 60 * 10,
      });
      return getPublicUrl;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}
