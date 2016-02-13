"use strict";
require('zone.js/dist/zone.min.js');
require('reflect-metadata');
require("bootstrap/css/bootstrap.css!");
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
var app_component_1 = require("./app-component");
var sound_cloud_service_1 = require("./sound-cloud-service");
browser_1.bootstrap(app_component_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    sound_cloud_service_1.SoundCloudService
]);
//# sourceMappingURL=main.js.map