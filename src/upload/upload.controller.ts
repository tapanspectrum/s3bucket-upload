import { BadRequestException, Controller, FileTypeValidator, HttpCode, HttpStatus, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadservice: UploadService
    ) { }
    @Post()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 100000000
                }),
                new FileTypeValidator({
                    fileType: 'image/jpeg'
                })
            ]
        })
    ) file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("File not found!");
        } else {
            const fileuploadstatus = await this.uploadservice.uploadFile(
                file.originalname, file.buffer
            );
            return 'SuccessFully Updated !!';
        }
    }
}
