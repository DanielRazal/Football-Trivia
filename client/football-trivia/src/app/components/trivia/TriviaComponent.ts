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
  totalGroups: number = 20;


  constructor(private leagueService: LeagueService,
    private router: Router, private dialog: MatDialog) {
  }

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
    const leagueStandingsArray = JSON.parse(leagueStandingsJSON!);
    console.log(leagueStandingsArray)

    if (leagueId === 'ger.1' || leagueId === 'fra.1') {
      this.totalGroups = 18;
    } else {
      this.totalGroups = 20;
    }

    let percentage = 0;

    if (Array.isArray(leagueStandingsArray)) {
      const numberOfGroups = leagueStandingsArray.length;
      console.log("Number of groups: " + numberOfGroups);

      percentage = ((this.totalGroups - numberOfGroups) / this.totalGroups) * 100;
      console.log("Percentage: " + percentage + "%");
    } else {
      console.log("Invalid JSON format");
    }

    return Math.floor(percentage);
  }


}
