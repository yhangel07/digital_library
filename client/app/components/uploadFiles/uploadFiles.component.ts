import { Component } from '@angular/core';
import { FilesComponent } from '../files/files.component';
import { FilesService } from '../../services/files/files.service';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
    moduleId: module.id,
    selector: 'app-upload-files',
    templateUrl: 'uploadFiles.component.html'
})


export class UploadFilesComponent{
    public uploader: FileUploader = new FileUploader({ url: '/api/files/upload' })
    private res: number;

    constructor(){

        this.uploader.onSuccessItem  = (item: FileItem, response: string, status: number,
            headers: ParsedResponseHeaders) => {
            console.log("onSuccessItem: " + status, response, item);
            this.res = parseInt(response.substring(("{'error_code':").length, ("{'error_code':").length + 1));
            if (this.res == 0) {
                //refresh Files[]
                console.log('FILES should be refreshed');
            }
        }
     }

     onChange(event: any): void { event.srcElement.value = ''; }
}