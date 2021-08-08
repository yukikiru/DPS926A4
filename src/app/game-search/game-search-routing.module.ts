import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameSearchPage } from './game-search.page';

const routes: Routes = [
  {
    path: '',
    component: GameSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameSearchPageRoutingModule {}
