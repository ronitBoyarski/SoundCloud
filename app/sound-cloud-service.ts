import {Injectable} from "angular2/core";

declare var fetch:any;
declare var SC:any;

SC.initialize({
  client_id: 'd652006c469530a4a7d6184b18e16c81'
});

const PAGE_SIZE = 6;

@Injectable()
export class SoundCloudService {

    public search(text,page=0) {
      const offset = page*PAGE_SIZE;
      return SC.get('/tracks', { q: text, limit: PAGE_SIZE, linked_partitioning: 1, offset });
    }
    public getTrack(id) {
      return SC.get(`/tracks/${id}`);
    }
    public getPlayerEmbed(uri) {
      return SC.oEmbed(uri, { auto_play: true });
    }


}
