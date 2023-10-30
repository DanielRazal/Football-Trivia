import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import League from 'src/app/models/League';
import { LeagueService } from 'src/app/services/league.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

  leagues: League[] = [];
  isAccepted: boolean = false;
  percent: number = 0



  constructor(private leagueService: LeagueService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLeagues();
  }

  showLeagues() {
    this.getLeagues();
    this.isAccepted = true;
  }

  getLeagues() {
    this.leagueService.getLeagues().subscribe((leagues) => {
      this.leagues = leagues;
    })
  }

  openMessageDialog(title: string, message: string, isCorrect: boolean) {
    this.dialog.open(MessageDialogComponent, {
      data: { title, message, isCorrect },
    });
  }

  getLeagueId(id: string) {
    this.router.navigate(['team']);
    localStorage.setItem("LeagueId", id);
  }

  resetData(leagueId: string) {
    const standingsByLeagueId = `standings_${leagueId}`;
    const LeagueId = 'LeagueId'
    if (standingsByLeagueId) {
      localStorage.removeItem(standingsByLeagueId);
      localStorage.removeItem(LeagueId);
    }
  }

  percentNumber(leagueId: string) {
    const standingsByLeagueId = `standings_${leagueId}`;
    const leagueStandingsJSON = localStorage.getItem(standingsByLeagueId);

    if (leagueStandingsJSON === '[]') {
      this.percent = 100; // Empty array, so 100%
    } else if (!leagueStandingsJSON) {
      this.percent = 0; // No localStorage data, so 0%
    } else {
      const teams = JSON.parse(leagueStandingsJSON);
      const totalTeams = teams.length;
      const remainingTeams = this.leagues.find((league) => league.id === leagueId)?.name.length || 0; // Assuming leagues have teams

      if (remainingTeams === 0) {
        this.percent = 100; // You've finished the league
      } else {
        const percentageRemaining = (remainingTeams / totalTeams) * 100;
        this.percent = Math.floor(percentageRemaining);
      }
    }

    return this.percent;
  }




}
