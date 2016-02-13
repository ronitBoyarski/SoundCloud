import 'zone.js/dist/zone.min.js';
import 'reflect-metadata';

import "bootstrap/css/bootstrap.css!"

import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {AppComponent} from "./app-component";
import {SoundCloudService} from "./sound-cloud-service";


bootstrap(AppComponent,[
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  SoundCloudService
]);
