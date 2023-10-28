import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import League from '../models/League';
import { LeagueEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private http: HttpClient) { }

  private LEAGUES_API = LeagueEnvironment.LEAGUES_API;

  getLeagues(): Observable<League[]> {
    const url = this.LEAGUES_API;
    return this.http.get<League[]>(url);
  }
}
