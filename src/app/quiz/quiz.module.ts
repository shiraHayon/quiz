import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {QuizEffects} from './store/quiz.effects';
import {QuizReducer} from './store/quiz.reducer';
import {CarouselModule} from 'primeng/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import {QuizComponent} from './components/quiz/quiz.component';

@NgModule({
  declarations: [QuizComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    EffectsModule.forRoot([QuizEffects]),
    StoreModule.forRoot({quiz: QuizReducer}),
    CarouselModule,
    BrowserAnimationsModule,
    CardModule,
  ]
})
export class QuizModule {
}
