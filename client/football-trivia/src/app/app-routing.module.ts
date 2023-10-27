import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriviaComponent } from './components/trivia/TriviaComponent';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  { path: '', redirectTo: '/trivia', pathMatch: 'full' },
  { path: 'trivia', component: TriviaComponent },
  { path: 'team', component: TeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
