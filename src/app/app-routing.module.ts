import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'game-search',
    loadChildren: () => import('./game-search/game-search.module').then( m => m.GameSearchPageModule)
  },
  {
    path: 'my-games',
    loadChildren: () => import('./my-games/my-games.module').then( m => m.MyGamesPageModule)
  },
  {
    path: 'game-info',
    loadChildren: () => import('./game-info/game-info.module').then( m => m.GameInfoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
