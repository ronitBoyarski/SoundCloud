var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var sound_cloud_service_1 = require('./sound-cloud-service');
var SearchComponent = (function () {
    function SearchComponent(soundCloudService, location, params) {
        this.soundCloudService = soundCloudService;
        this.location = location;
        this.page = 0;
        this.viewStyle = "list";
        this.lastSearchs = [];
        var localStorageViewStyle = localStorage["viewStyle"];
        if (localStorageViewStyle) {
            this.viewStyle = localStorageViewStyle;
        }
        var localStorageHistory = localStorage["history"];
        if (localStorageHistory) {
            this.lastSearchs = localStorage["history"].split(",");
        }
        this.searchText = params.get("searchText");
        if (this.searchText) {
            var page = params.get("page");
            if (page) {
                this.page = Number(page);
            }
            this.search(this.searchText, this.page);
        }
    }
    SearchComponent.prototype.performNewSearch = function (searchText) {
        this.page = 0;
        this.updateHistory(searchText);
        this.search(searchText, this.page);
    };
    SearchComponent.prototype.search = function (searchText, page) {
        var _this = this;
        this.location.replaceState("", "searchText=" + searchText + "&page=" + page);
        this.soundCloudService.search(searchText, page).then(function (result) { return _this.handleResult(result); });
    };
    SearchComponent.prototype.handleResult = function (result) {
        this.tracks = result.collection;
        if (result.next_href && result.next_href.length > 0) {
            this.page++;
        }
    };
    SearchComponent.prototype.updateHistory = function (searchText) {
        this.lastSearchs.splice(0, 0, searchText);
        if (this.lastSearchs.length > 5) {
            this.lastSearchs = this.lastSearchs.slice(0, 5);
        }
        localStorage["history"] = this.lastSearchs;
    };
    SearchComponent.prototype.changeView = function (viewStyle) {
        this.viewStyle = viewStyle;
        localStorage["viewStyle"] = viewStyle;
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: "search-component",
            styles: ["\n      * {\n        font-size: 16px;\n      }\n    "],
            directives: [router_1.RouterLink],
            template: "\n      <div class=\"container\">\n        <div class=\"row\">\n          <br/>\n          <form (submit)=\"performNewSearch(searchText);$event.preventDefault()\">\n            <div class=\"col-lg-6\">\n              <div class=\"input-group\">\n                <input [(ngModel)]=\"searchText\" type=\"text\" class=\"form-control\" placeholder=\"Search for...\">\n                <span class=\"input-group-btn\">\n                  <button class=\"btn glyphicon glyphicon-search \"(click)=\"performNewSearch(searchText);$event.preventDefault()\" type=\"button\"></button>\n                </span>\n              </div>\n            </div>\n            <div class=\"col-lg-6 btn-group\" role=\"group\" aria-label=\"...\">\n              <button type=\"button\" [class]=\"'btn glyphicon glyphicon-th-list btn-default ' + (viewStyle==='list'?'active':'')\" (click)=\"changeView('list')\"></button>\n              <button type=\"button\" [class]=\"'btn glyphicon glyphicon-th-large btn-default ' + (viewStyle==='tiles'?'active':'')\" (click)=\"changeView('tiles')\"></button>\n            </div>\n          </form>\n        </div>\n        <br/>\n        <div class=\"row\">\n          <div class=\"col-lg-6\">\n            <table class=\"table table-bordered table-hover table-striped\">\n              <tbody>\n                <tr *ngFor=\"#track of tracks\">\n                  <td>\n                    <a *ngIf=\"viewStyle=='tiles'\"\n                      [routerLink]=\"['PlayerComponent', {id:track.id}]\">\n                      <img [src]=\"track.artwork_url\"/>\n                    </a>\n                    <a *ngIf=\"viewStyle=='list'\"\n                       [routerLink]=\"['PlayerComponent', {id:track.id}]\">{{track.title}}\n                    </a>\n                 </td>\n                </tr>\n              </tbody>\n            </table>\n            <button class=\"btn\" *ngIf=\"page>0\" (click)=\"search(searchText,page)\">Next</button>\n          </div>\n          <div class=\"col-lg-2\">\n            <table class=\"table table-bordered\">\n              <tbody>\n                <tr *ngFor=\"#searchText of lastSearchs\">\n                  <td>\n                    <a [routerLink]=\"['SearchComponent', {searchText:searchText}]\">{{searchText}}</a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n        </div>\n      </div>\n      "
        }), 
        __metadata('design:paramtypes', [sound_cloud_service_1.SoundCloudService, router_1.Location, router_1.RouteParams])
    ], SearchComponent);
    return SearchComponent;
})();
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search-component.js.map