import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import { ApiService } from '../services/api.service';
import { Game } from '../models/game.model';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.page.html',
  styleUrls: ['./game-search.page.scss'],
})
export class GameSearchPage implements OnInit {

  constructor(public m: ManagerService,private api: ApiService, public alertController:AlertController, 
    private router:Router, private storage:StorageService) { }
  form: FormGroup
  secret: string;
  body: string; //This is the body that will be sent to the API
  search: string; //Game the user is searching for
  searchList: Game[]; //List to be filled with games from server
  loading: boolean; //Used to hide card if data is not loaded yet

  ngOnInit() {
    //Set up form Group options
    this.form = new FormGroup({
      searchGames : new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required,Validators.minLength(3)]
      })
    });
    this.searchList = new Array<Game>();
    this.loading = false;
    this.setBody("");
  }

  //Searches for games by name in search bar then searches for cover image ID for cover using cover ID number.
  //If the cover is found sets the game's cover to the image_id, otherwise uses a default value.
  async searchGame(){
    if(this.form.invalid){
      this.Popup("Error","Make sure search is at least 3 characters")
    }
    else{
      let promise = new Promise((resolve, reject)=>{
        this.loading = true;
        this.setBody(this.form.get('searchGames').value);

        this.api.getGame(this.body).toPromise().then( //Get game list
          res=>{
            this.searchList = res;
            if(this.searchList.length == 0){
              this.Popup("Error","No results found");
            }
          },err =>{
            reject(err);
          }
        ).then(()=>{this.loading=false})
      });
      return promise;
      
    }
  }

  //Sets the body for the HTTP Post to the API
  setBody(game: string){
    this.search = game;
    this.body = `search "${this.search}"; fields name,aggregated_rating,cover,first_release_date,summary; limit 30;`;
  }

  //Displays an Alert Controller popup, taking the header and message as parameters
  async Popup(header:string,message:string){
    const alert = await this.alertController.create({
      subHeader: `${header}`,
      message:  `${message}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  //Adds game to library if ti doesn't already exist
  addGame(i:number){
    if(this.inList(i)){
      this.Popup("Error","Game already exists in library");
    }
    else{
      this.m.saveGame(this.searchList[i]);
      this.makeToast("Added Game to Library!");
    }
    
  }
  //Checks if game in search list exists in game library
  inList(i:number){
    let exists = false;
    for(var j = 0; j < this.m.myGames.gameList.length;j++){
      if(this.m.myGames.gameList[j].id == this.searchList[i].id){
        exists = true;
      }
    }
    return exists;
  }

  //Navigates to display page for game information
  displayGame(i:number){
    this.router.navigateByUrl('/game-info',{state:this.searchList[i]});
  }

  //Remove game from user's library
  async removeGame(i:number){
    const alert = await this.alertController.create({
      subHeader: 'Remove game',
      message:  `Would you like to remove ${this.searchList[i].name} from library?`,
      buttons: [
        {text:'Cancel'},
        {text:'Remove',
        handler: () => {
          this.m.removeGame(this.searchList[i]);
          this.makeToast("Game Removed From Library");
        }}]
    });
    await alert.present();
  }

  //Makes a toast popup
  async makeToast(message:string){
    async function presentToast() {
      const toast = document.createElement('ion-toast');
      toast.message = `${message}`;
      toast.duration = 2000;
    
      document.body.appendChild(toast);
      return toast.present();
    }
    await presentToast();
  }
}
