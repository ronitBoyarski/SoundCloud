import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

import {SearchComponent} from './search-component';
import {PlayerComponent} from "./player-component"

@Component({
    selector: "my-app",
    directives: [ROUTER_DIRECTIVES, SearchComponent, PlayerComponent],
    template: `
      <router-outlet></router-outlet>
    `
})
@RouteConfig([
    {path: '/', component: SearchComponent, name: 'SearchComponent', useAsDefault:true},
    {path: '/player', component: PlayerComponent, name: 'PlayerComponent'}
])
export class AppComponent {

}
