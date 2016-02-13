import {SoundCloudService} from "./sound-cloud-service";
import {Component} from 'angular2/core';
import {RouteParams,Location} from 'angular2/router';

@Component({
    selector: "player-component",
    styles: [`
      * {
        font-size: 16px;
      }
      img {
        width: 200px;
      }
    `],
    template: `
      <div class="jumbotron">
        <button class="btn" (click)="goBack()">Back</button>
        <br/><br/>
        <a href="" (click)="play();$event.preventDefault()"><img [src]="track?.artwork_url" /></a>
        <div *ngIf="playerHtml" [innerHtml]="playerHtml"></div>
      </div>
    `
})
export class PlayerComponent {
  private track;
  private playerHtml;
  constructor(private location:Location, private sourcCloudService:SoundCloudService, params:RouteParams) {
    sourcCloudService.getTrack(params.get("id")).then(track=>this.track=track);
  }
  goBack() {
    this.location.back();
  }
  play() {
    console.log(this.track);
    this.sourcCloudService.getPlayerEmbed(this.track.uri).then(oEmbed => {
      this.playerHtml=oEmbed.html;
    });
  }
}
