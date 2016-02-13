var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var sound_cloud_service_1 = require("./sound-cloud-service");
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var PlayerComponent = (function () {
    function PlayerComponent(location, sourcCloudService, params) {
        var _this = this;
        this.location = location;
        this.sourcCloudService = sourcCloudService;
        sourcCloudService.getTrack(params.get("id")).then(function (track) { return _this.track = track; });
    }
    PlayerComponent.prototype.goBack = function () {
        this.location.back();
    };
    PlayerComponent.prototype.play = function () {
        var _this = this;
        console.log(this.track);
        this.sourcCloudService.getPlayerEmbed(this.track.uri).then(function (oEmbed) {
            _this.playerHtml = oEmbed.html;
        });
    };
    PlayerComponent = __decorate([
        core_1.Component({
            selector: "player-component",
            styles: ["\n      * {\n        font-size: 16px;\n      }\n      img {\n        width: 200px;\n      }\n    "],
            template: "\n      <div class=\"jumbotron\">\n        <button class=\"btn\" (click)=\"goBack()\">Back</button>\n        <br/><br/>\n        <a href=\"\" (click)=\"play();$event.preventDefault()\"><img [src]=\"track?.artwork_url\" /></a>\n        <div *ngIf=\"playerHtml\" [innerHtml]=\"playerHtml\"></div>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [router_1.Location, sound_cloud_service_1.SoundCloudService, router_1.RouteParams])
    ], PlayerComponent);
    return PlayerComponent;
})();
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=player-component.js.map