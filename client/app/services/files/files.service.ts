import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { log } from 'core-js/library/web/timers';

@Injectable()
export class FilesService{
    constructor(private http: Http){
        console.log('Files Service Initialized...');
    }

    getAllFiles(){
        return this.http.get('/api/files/getAllFiles')
            .map(res => res.json());
    }

    addFile(newFile) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/files/upload', JSON.stringify(newFile), { headers: headers })
            .map(res => res.json());
    }
}