import { Component, OnInit, ViewChild } from '@angular/core';
import { FilesService } from './services/files/files.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [FilesService]
})

export class AppComponent {

 }
