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
var ng2_file_upload_1 = require("ng2-file-upload");
var UploadFilesComponent = (function () {
    function UploadFilesComponent() {
        var _this = this;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: '/api/files/upload' });
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            console.log("onSuccessItem: " + status, response, item);
            _this.res = parseInt(response.substring(("{'error_code':").length, ("{'error_code':").length + 1));
            if (_this.res == 0) {
                //refresh Files[]
                console.log('FILES should be refreshed');
            }
        };
    }
    UploadFilesComponent.prototype.onChange = function (event) { event.srcElement.value = ''; };
    return UploadFilesComponent;
}());
UploadFilesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-upload-files',
        templateUrl: 'uploadFiles.component.html'
    }),
    __metadata("design:paramtypes", [])
], UploadFilesComponent);
exports.UploadFilesComponent = UploadFilesComponent;
//# sourceMappingURL=uploadFiles.component.js.map