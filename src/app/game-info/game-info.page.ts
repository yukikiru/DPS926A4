import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.page.html',
  styleUrls: ['./game-info.page.scss'],
})
export class GameInfoPage implements OnInit {

  game: Game;

  constructor(private alert: AlertController) {}
  func(){
    this.alert.create();
  }
  ngOnInit() {
    this.game = history.state;
  }

}
