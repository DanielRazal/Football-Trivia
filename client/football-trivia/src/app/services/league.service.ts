import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import League from '../models/League';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private http: HttpClient) { }

  getLeagues(): Observable<League[]> {
    const url = 'http://localhost:3001/Leagues';
    return this.http.get<League[]>(url);
  }

}
