import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from'@aws-sdk/client-s3';

@Injectable()
export class UploadService {
    // private readonly config = {
    //     region: process.env.AWS_S3_REGION,
    //     credentials: {
    //         accessKeyId: process.env.ACCESS_KEY,
    //         secretAccessKey: process.env.SECRECT_ACCESS_KEY
    //     }
    // }
    private readonly s3Clint = new S3Client({
        credentials: {
            accessKeyId: process.env.ACCESS_KEY, // store it in .env file to keep it safe
            secretAccessKey: process.env.SECRECT_ACCESS_KEY
        },
        region: process.env.AWS_S3_REGION // this is the region that you select in AWS account
    });

    constructor(){}

    async uploadFile(fileName: string, file: Buffer){
        return await this.s3Clint.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fileName,
                Body: file
            })
        );
        // if(fileuploadstatus.$metadata.httpStatusCode){
        //     return 'Successfully Uploaded !!'
        // }
    }
}
