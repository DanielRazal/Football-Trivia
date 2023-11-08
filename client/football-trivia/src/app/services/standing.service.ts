import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import Standing from '../models/Standing';
import { StandingEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandingService {

  constructor(private http: HttpClient) { }

  private STANDINGS_API = StandingEnvironment.STANDINGS_API;
  private SEASON_API = StandingEnvironment.SEASON_API;

  getStandingByLeagueId(leagueId: string): Observable<any[]> {
    const url = `${this.STANDINGS_API}/${leagueId}/${this.SEASON_API}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        if (Array.isArray(response.data.standings)) {
          const standingData = response.data.standings;
          const teamInfo = standingData.map((standing: any) => ({
            id: standing.team.id,
            name: standing.team.name,
            href: standing.team.logos[0].href,
          }));
          return teamInfo;
        } else {
          console.error('Invalid API response format');
          return [];
        }
      })
    );
  }

  HelpConditions(standings: Standing[], currentIndex: number, currentHelpIndex: number,
    displayedTeamHelp: { label: string; value: string }[]) {
    const currentTeamName = standings[currentIndex].name;

    if (currentHelpIndex === 0) {
      displayedTeamHelp.push({ label: 'Length', value: currentTeamName.length.toString() });
    } else if (currentHelpIndex === 1) {
      displayedTeamHelp.push({ label: 'First letter', value: currentTeamName[0] });
    } else if (currentHelpIndex === 2) {
      displayedTeamHelp.push({ label: 'Last letter', value: currentTeamName.slice(-1) });
    } else if (currentHelpIndex === 3) {
      displayedTeamHelp.push({ label: 'space', value: currentTeamName.includes(' ') ? 'Have space' : 'No space' });
    } else if (currentHelpIndex === 4) {
      displayedTeamHelp.push({ label: 'Answer', value: currentTeamName });
    }
  }
}

