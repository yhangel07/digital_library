import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';
import { FilesComponent } from './components/files/files.component';
import { UploadFilesComponent } from './components/uploadFiles/uploadFiles.component';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule ],
  declarations: [
    AppComponent, 
    FileSelectDirective, 
    FilesComponent, 
    UploadFilesComponent,  
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
