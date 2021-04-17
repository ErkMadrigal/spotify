import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log('spotify servicio listo');
  }

  getQuery( query: string ){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQB6Amrw_7kId_0U-cFC4kfbg3CvUyyk76QV3kggnuedPe3ZUAiuIPzycAddilCvyDzOnXeLBfXkZRb7PdI'
    });

    return this.http.get(url, { headers });

  }

  getNewReleases() {

    return this.getQuery('browse/new-releases')
          .pipe( map( data =>  data['albums'].items ));

  }

  getArtistas( termino: string){
   
    return this.getQuery(`search?q=${ termino }&type=artist&limit=20`)
          .pipe( map( data => data['artists'].items ));  
    
  }

  getArtista( id: string){
   
    return this.getQuery(`artists/${id}`);
          // .pipe( map( data => data['artists'].items ));  
    
  }

  getTopTracks( id: string){
   
    return this.getQuery(`artists/${id}/top-tracks?market=us`)
          .pipe( map( data => data['tracks'] ));  
    
  }

}
