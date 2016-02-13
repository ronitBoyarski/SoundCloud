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
var RandomColorDirective = (function () {
    function RandomColorDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.updateColor();
    }
    RandomColorDirective.prototype.getColor = function () {
        return "#" + ((1 << 24) * Math.random() | 0).toString(16);
    };
    RandomColorDirective.prototype.onClick = function () {
        var _this = this;
        this.updateColor("lightgrey");
        window.setTimeout(function () { return _this.updateColor(); }, 1000);
    };
    RandomColorDirective.prototype.updateColor = function (color) {
        if (color === void 0) { color = this.getColor(); }
        this.renderer.setElementStyle(this.element.nativeElement, 'color', color);
    };
    RandomColorDirective = __decorate([
        core_1.Directive({
            selector: '[randomColor]',
            host: {
                '(click)': 'onClick()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], RandomColorDirective);
    return RandomColorDirective;
})();
exports.RandomColorDirective = RandomColorDirective;
//# sourceMappingURL=random-color-directive.js.map