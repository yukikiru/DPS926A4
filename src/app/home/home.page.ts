import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ManagerService } from '../services/manager.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private api: ApiService,private storage: StorageService,private m:ManagerService,) {
  }

  ngOnInit(){
    
  }

  ionViewWillEnter(){
    this.m.myGames.gameList = this.storage.getAll();
  }
}
