import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameSearchPageRoutingModule } from './game-search-routing.module';

import { GameSearchPage } from './game-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameSearchPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GameSearchPage]
})
export class GameSearchPageModule {}
