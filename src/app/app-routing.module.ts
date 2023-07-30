import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GamesListComponent } from './games-list/games-list.component';

const routes: Routes = [
  {path: ``, component: GamesListComponent, pathMatch: 'full'},
  {path: `detail/:id`, component: GameDetailComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
