var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
SC.initialize({
    client_id: 'd652006c469530a4a7d6184b18e16c81'
});
var PAGE_SIZE = 6;
var SoundCloudService = (function () {
    function SoundCloudService() {
    }
    SoundCloudService.prototype.search = function (text, page) {
        if (page === void 0) { page = 0; }
        var offset = page * PAGE_SIZE;
        return SC.get('/tracks', { q: text, limit: PAGE_SIZE, linked_partitioning: 1, offset: offset });
    };
    SoundCloudService.prototype.getTrack = function (id) {
        return SC.get("/tracks/" + id);
    };
    SoundCloudService.prototype.getPlayerEmbed = function (uri) {
        return SC.oEmbed(uri, { auto_play: true });
    };
    SoundCloudService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SoundCloudService);
    return SoundCloudService;
})();
exports.SoundCloudService = SoundCloudService;
//# sourceMappingURL=sound-cloud-service.js.map