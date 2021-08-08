import { Token } from '../models/token.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Creds } from '../config';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL:string; //URL for the API
  tokenURL:string; //URL to get token
  token:Token;
  creds: Creds;
  CORS: string; //This is required to workaround CORS
  
  constructor(private http: HttpClient) { 
    this.creds = new Creds();
    this.CORS = "https://cors-bypas.herokuapp.com/"; //This is required to workaround CORS
    this.tokenURL = `https://id.twitch.tv/oauth2/token?client_id=${this.creds.client_id}&client_secret=${this.creds.client_secret}&grant_type=${this.creds.grant_type}`;
    this.apiURL = `https://api.igdb.com/v4`;
    this.token = new Token();
    this.getToken().subscribe(t => {this.token = t}); //Get token on creation
  }
  //Gets token from API
  getToken(){
    let tmp = "";
    //To get Token must use POST request, send empty string
    return this.http.post<Token>(`${this.tokenURL}`,tmp).pipe(
      map(data => {
        return data;
      })
    );
  }

  //Gets game list from search by user. Body is the search string and parameters to return the object with relevant info from API.
  //Sorts data and makes sure all values exist, otherwise sets defaults
  getGame(body: string): Observable<Game[]>{
    //Set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Client-ID':  this.creds.client_id,
        Authorization: `${this.token.token_type} ${this.token.access_token}`
      })
    };
    let searchList = new Array<Game>();
    //To get games from API must post with parameters in body
    //NOTE: API needs to use a POST so it is not possible to use jsonp, using a CORS proxy
    return this.http.post<Game[]>(`${this.CORS}${this.apiURL}/games`,body, httpOptions).pipe(
      map(res => {
          searchList = res;
          if(searchList.length !=0){
            searchList.sort((a,b) => a.name.localeCompare(b.name));
            //Set default values
            for(var i = 0; i < searchList.length; i ++){
              if(searchList[i].cover === undefined){
                searchList[i].cover = "10000"
              }
              if(searchList[i].aggregated_rating === undefined){
                searchList[i].aggregated_rating = 0;
              }
              if(searchList[i].first_release_date === undefined){
                searchList[i].first_release_date = -2208988800;
              }
              if(searchList[i].summary === undefined){
                searchList[i].summary = "N/A";
              }
              //Round rating to 1 decimal place
              searchList[i].aggregated_rating = Math.round(searchList[i].aggregated_rating * 10) / 10; 
              //Convert EPOCH date to string
              var d = new Date(0);
              d.setUTCSeconds(searchList[i].first_release_date);
              searchList[i].date = d.toDateString();  
            }
          }
          //After data is received from API for games, gets cover ID from covers
          for(var i = 0; i < searchList.length; i++){
            this.getCoverID(`fields image_id; where id = ${searchList[i].cover};`).toPromise().then( //Get cover image id's
              function(i,res){
                if(res.length > 0){
                  searchList[i].cover = res[0].image_id; //Only need image_id
                }
                else{
                  searchList[i].cover = "nocover_qhhlj6"; //Default value if image doesn't exist
                }
              }.bind(this,i)
            )
          }
          
          return searchList;
      })
    );
  }

  //Gets the image id for a game's cover
  getCoverID(body:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Client-ID':  this.creds.client_id,
        Authorization: `${this.token.token_type} ${this.token.access_token}`
      })
    };
    //API Post request with parameters in body
    //NOTE: API needs to use a POST so it is not possible to use jsonp, using a CORS proxy
    return this.http.post<any>(`${this.CORS}${this.apiURL}/covers`,body,httpOptions).pipe(
      map(data => {
        return data;
      })
    );
  }

}
