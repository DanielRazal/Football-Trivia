import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Standing from '../models/Standing';

@Injectable({
  providedIn: 'root'
})
export class StandingService {

  constructor(private http: HttpClient) { }

  // getStandingByLeagueId(id: string, teamName: string): Observable<Standing> {
  //   const url = `http://localhost:3001/Standings/${id}/${teamName}`;
  //   return this.http.get<Standing>(url);
  // }

  getStandingByLeagueId(id: string): Observable<Standing[]> {
    const url = `http://localhost:3001/Standings/${id}`;
    return this.http.get<Standing[]>(url);
  }


}
