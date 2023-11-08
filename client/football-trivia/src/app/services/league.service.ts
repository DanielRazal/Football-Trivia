import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import League from '../models/League';
import { LeagueEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LeagueService {

  constructor(private http: HttpClient) { }

  private LEAGUES_API = LeagueEnvironment.LEAGUES_API;

  getLeagues(): Observable<League[]> {
    return this.http.get<any>(this.LEAGUES_API).pipe(
      map((response) => {
        const data = response.data;

        if (data) {
          const leagueData = data.map((league: League) => {
            return {
              id: league.id,
              name: league.name,
              logos: league.logos,
            };
          });

          const selectedIndices = [5, 9, 16, 7, 6];
          const selectedLeagues = selectedIndices.map((index) => leagueData[index]);

          return selectedLeagues;
        } else {
          console.error('Invalid API response format');
          return [];
        }
      })
    );
  }


  percentNumber(leagueId: string, totalGroups: number = 20) {
    const standingsByLeagueId = `standings_${leagueId}`;
    const leagueStandingsJSON = localStorage.getItem(standingsByLeagueId);
    const leagueStandingsArray = JSON.parse(leagueStandingsJSON!);

    if (leagueId === 'ger.1' || leagueId === 'fra.1') {
      totalGroups = 18;
    } else {
      totalGroups = 20;
    }

    let percentage = 0;

    if (Array.isArray(leagueStandingsArray)) {
      const numberOfGroups = leagueStandingsArray.length;
      percentage = ((totalGroups - numberOfGroups) / totalGroups) * 100;
    }

    return Math.floor(percentage);
  }
}
