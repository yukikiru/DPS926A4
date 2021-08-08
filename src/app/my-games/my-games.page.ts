import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Game } from '../models/game.model';
import { ManagerService } from '../services/manager.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.page.html',
  styleUrls: ['./my-games.page.scss'],
})
export class MyGamesPage implements OnInit {

  games: Game[];

  constructor(private m: ManagerService, public alertController: AlertController, private router:Router, private storage:StorageService) { }

  ngOnInit() {
    this.games = this.m.myGames.gameList;
  }

  //Remove game
  async removeGame(i:number){
    const alert = await this.alertController.create({
      subHeader: 'Remove game',
      message:  `Would you like to remove ${this.m.myGames.gameList[i].name} from library?`,
      buttons: [
        {text:'Cancel'},
        {text:'Remove',
        handler: () => {
          this.m.removeGame(this.m.myGames.gameList[i]);
          this.makeToast("Removed Game From Library");
        }}]
    });
    await alert.present();
  }

  //Routes user to game information page, passing the selected game as a state
  displayGame(i:number){
    this.router.navigateByUrl('/game-info',{state:this.games[i]});
  }

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
