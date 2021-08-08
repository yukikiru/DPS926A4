import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { MyGames } from '../models/my-games.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  myGames: MyGames;
  constructor(private storage:StorageService) { 
    this.myGames = new MyGames();
    this.getGames();
  }

  async getGames(){
    this.myGames.gameList = await this.storage.getAll();
  }

  //Add Game to persistence data
  saveGame(game:Game){
    this.myGames.gameList.push(game);
    this.storage.addGame(game.id.toString(),game);
  }
  //Remove game from persisting data
  removeGame(game: Game){
    let index = this.myGames.gameList.indexOf(game);
    this.myGames.gameList.splice(index,1);
    this.storage.removeGame(game);
  }
}
