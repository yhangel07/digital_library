import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../services/files/files.service';
import { Files } from '../../declarations/Files';


@Component({
    moduleId: module.id,
    selector: 'app-files',
    templateUrl: 'files.component.html',
    styleUrls: ['files.component.css'],
    providers: []
})

export class FilesComponent{
    files : Files[];
    filePreview : boolean = false;
    fileURL : string = 'about:blank';
    API: string = 'http://localhost:3000/';
    viewerJsExtention : string = 'ViewerJS/#..';
    route: string = '/api/files/file/';

    constructor(private filesService:FilesService){
        this.filesService.getAllFiles()
            .subscribe(files => {
                this.files = files;
                console.log('Files: ', files);
            });
        

    }

    viewFile(file){
        this.filePreview = true;

        this.filesService.getFile(file._id)
            .subscribe(
            (res) => {
                 console.log(res);
                this.fileURL = this.API + this.viewerJsExtention + this.route + res.id;
            } 
        );
    }

    formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }



}