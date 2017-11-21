import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';
import { Files } from '../../declarations/Files';



@Injectable()
export class FilesService{
 

    constructor(private http: Http){
        console.log('Files Service Initialized...');
     }

    getAllFiles(): Observable<Files[]>{
        return this.http.get('/api/files/getAllFiles').map(res => res.json());
    }
}