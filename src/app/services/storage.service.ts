import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage,) { 
      this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //Add a new game to storage
  addGame(key: string,value: any) {
    this._storage?.set(key, value);
  }

  //Get all games from storage
  getAll(){
    let library = new Array<Game>();
    if (this._storage != null){
    this._storage.forEach((value, key, index) => {
      library.push(value as Game);
    });
  }
    return library;
  }

  async removeGame(game: Game){
    await this._storage.remove(game.id.toString());
  }
}
