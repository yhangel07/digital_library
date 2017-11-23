"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var files_service_1 = require("../../services/files/files.service");
var FilesComponent = (function () {
    function FilesComponent(filesService) {
        var _this = this;
        this.filesService = filesService;
        this.filePreview = false;
        this.fileURL = 'about:blank';
        this.API = 'http://localhost:3000/';
        this.viewerJsExtention = 'ViewerJS/#..';
        this.route = '/api/files/file/';
        this.filesService.getAllFiles()
            .subscribe(function (files) {
            _this.files = files;
            console.log('Files: ', files);
        });
    }
    FilesComponent.prototype.viewFile = function (file) {
        var _this = this;
        this.filePreview = true;
        this.filesService.getFile(file._id)
            .subscribe(function (res) {
            console.log(res);
            _this.fileURL = _this.API + _this.viewerJsExtention + _this.route + res.id;
        });
    };
    FilesComponent.prototype.formatBytes = function (bytes, decimals) {
        if (bytes == 0)
            return '0 Bytes';
        var k = 1024, dm = decimals || 2, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    return FilesComponent;
}());
FilesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-files',
        templateUrl: 'files.component.html',
        styleUrls: ['files.component.css'],
        providers: []
    }),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesComponent);
exports.FilesComponent = FilesComponent;
//# sourceMappingURL=files.component.js.map