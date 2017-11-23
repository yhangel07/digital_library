import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../services/files/files.service';
import { Files } from '../../declarations/Files';

@Component({
    moduleId: module.id,
    selector: 'app-files',
    templateUrl: 'files.component.html'
})

  

export class FilesComponent{
    files : Files[];
    fileUrl: string = "http://localhost:3000/api/files/file/5a13979a51fc072e585d2d2c";

    constructor(private filesService:FilesService){
        this.filesService.getAllFiles()
            .subscribe(files => {
                this.files = files;
                console.log('Files: ', files);
            });
        

    }

    viewFile(file){
        this.filesService.getFile(file._id)
            .subscribe(
            (res) => {
                // var fileURL = URL.createObjectURL(res);
                this.fileUrl = res.url;
                window.open(res.url);
                console.log(res);
            } 
        );
    }



}