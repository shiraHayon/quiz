import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuizComponent} from './quiz/components/quiz/quiz.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
