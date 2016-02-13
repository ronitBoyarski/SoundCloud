import {Component} from 'angular2/core';
import {RouterLink,Location,RouteParams} from 'angular2/router';
import {SoundCloudService} from './sound-cloud-service';

@Component({
    selector: "search-component",
    styles: [`
      * {
        font-size: 16px;
      }
    `],
    directives: [RouterLink],
    template: `
      <div class="container">
        <div class="row">
          <br/>
          <form (submit)="performNewSearch(searchText);$event.preventDefault()">
            <div class="col-lg-6">
              <div class="input-group">
                <input [(ngModel)]="searchText" type="text" class="form-control" placeholder="Search for...">
                <span class="input-group-btn">
                  <button class="btn glyphicon glyphicon-search "(click)="performNewSearch(searchText);$event.preventDefault()" type="button"></button>
                </span>
              </div>
            </div>
            <div class="col-lg-6 btn-group" role="group" aria-label="...">
              <button type="button" [class]="'btn glyphicon glyphicon-th-list btn-default ' + (viewStyle==='list'?'active':'')" (click)="changeView('list')"></button>
              <button type="button" [class]="'btn glyphicon glyphicon-th-large btn-default ' + (viewStyle==='tiles'?'active':'')" (click)="changeView('tiles')"></button>
            </div>
          </form>
        </div>
        <br/>
        <div class="row">
          <div class="col-lg-6">
            <table class="table table-bordered table-hover table-striped">
              <tbody>
                <tr *ngFor="#track of tracks">
                  <td>
                    <a *ngIf="viewStyle=='tiles'"
                      [routerLink]="['PlayerComponent', {id:track.id}]">
                      <img [src]="track.artwork_url"/>
                    </a>
                    <a *ngIf="viewStyle=='list'"
                       [routerLink]="['PlayerComponent', {id:track.id}]">{{track.title}}
                    </a>
                 </td>
                </tr>
              </tbody>
            </table>
            <button class="btn" *ngIf="page>0" (click)="search(searchText,page)">Next</button>
          </div>
          <div class="col-lg-2">
            <table class="table table-bordered">
              <tbody>
                <tr *ngFor="#searchText of lastSearchs">
                  <td>
                    <a [routerLink]="['SearchComponent', {searchText:searchText}]">{{searchText}}</a>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      `
})
export class SearchComponent {
    private tracks;
    private searchText;
    private page = 0;
    private viewStyle = "list";
    private lastSearchs = [];

    constructor(private soundCloudService:SoundCloudService, private location:Location, params:RouteParams) {
      const localStorageViewStyle = localStorage["viewStyle"];
      if (localStorageViewStyle) {
        this.viewStyle = localStorageViewStyle;
      }
      const localStorageHistory = localStorage["history"];
      if (localStorageHistory) {
        this.lastSearchs = localStorage["history"].split(",");
      }
      this.searchText = params.get("searchText");
      if (this.searchText) {
        const page = params.get("page");
        if (page) {
          this.page = Number(page);
        }
        this.search(this.searchText,this.page);
      }
    }

    performNewSearch(searchText) {
      this.page=0;
      this.updateHistory(searchText);
      this.search(searchText,this.page);
    }
    search(searchText,page) {
      this.location.replaceState("",`searchText=${searchText}&page=${page}`);
      this.soundCloudService.search(searchText,page).then(result => this.handleResult(result));
    }

    handleResult (result) {
      this.tracks=result.collection;
      if (result.next_href && result.next_href.length > 0) {
        this.page++;
      }
    }

    updateHistory(searchText) {
      this.lastSearchs.splice(0,0,searchText);
      if (this.lastSearchs.length > 5){
        this.lastSearchs = this.lastSearchs.slice(0,5);
      }
      localStorage["history"] = this.lastSearchs;
    }

    changeView (viewStyle) {
      this.viewStyle = viewStyle;
      localStorage["viewStyle"] = viewStyle;
    }
}
