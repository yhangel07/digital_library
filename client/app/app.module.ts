import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { FilesComponent } from './components/files/files.component';
import { UploadFilesComponent } from './components/uploadFiles/uploadFiles.component';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule ],
  declarations: [
    AppComponent, 
    FileSelectDirective, 
    FilesComponent, 
    UploadFilesComponent,
    SafePipe
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
