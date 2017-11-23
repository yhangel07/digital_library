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
var platform_browser_1 = require("@angular/platform-browser");
var ng2_file_upload_1 = require("ng2-file-upload");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/core");
var platform_browser_2 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var files_component_1 = require("./components/files/files.component");
var uploadFiles_component_1 = require("./components/uploadFiles/uploadFiles.component");
var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    return SafePipe;
}());
SafePipe = __decorate([
    core_2.Pipe({ name: 'safe' }),
    __metadata("design:paramtypes", [platform_browser_2.DomSanitizer])
], SafePipe);
exports.SafePipe = SafePipe;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule],
        declarations: [
            app_component_1.AppComponent,
            ng2_file_upload_1.FileSelectDirective,
            files_component_1.FilesComponent,
            uploadFiles_component_1.UploadFilesComponent,
            SafePipe
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map