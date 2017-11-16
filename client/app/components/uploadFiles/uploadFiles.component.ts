import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
    moduleId: module.id,
    selector: 'app-upload-files',
    templateUrl: 'uploadFiles.component.html'
})


export class UploadFilesComponent{

    public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3001/upload' });
    onChange(event: any): void { event.srcElement.value = ''; }
}