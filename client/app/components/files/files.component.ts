import { Component } from '@angular/core';
import { FilesService } from '../../services/files/files.service';
import { Files } from '../../declarations/Files';

@Component({
    moduleId: module.id,
    selector: 'app-files',
    templateUrl: 'files.component.html'
})

export class FilesComponent{
    files : Files[];

    constructor(private filesService:FilesService){
        this.filesService.getAllFiles()
            .subscribe(files =>{
                this.files = files;
            });
    }
}