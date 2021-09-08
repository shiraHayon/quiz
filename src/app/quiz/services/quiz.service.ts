import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestionItem} from '../store/models/question-item.model';

export interface QuestionRes {
  response_code: number;
  results: Array<QuestionItem>;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient: HttpClient) {
  }

  getSingleQuestion(): Observable<QuestionRes> {
    return this.httpClient.get<QuestionRes>('https://opentdb.com/api.php?amount=1&encode=base64&type=multiple');
  }
}
