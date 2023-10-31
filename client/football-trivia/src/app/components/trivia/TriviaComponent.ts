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

  // percentNumber(leagueId: string) {
  //   const standingsByLeagueId = `standings_${leagueId}`;
  //   const leagueStandingsJSON = localStorage.getItem(standingsByLeagueId);
  //   const leagueStandingsArray = JSON.parse(leagueStandingsJSON!);

  //   if (Array.isArray(leagueStandingsArray)) {
  //     const numberOfGroups = leagueStandingsArray.length;
  //     console.log("Number of groups: " + numberOfGroups);
  //   } else {
  //     console.log("Invalid JSON format");
  //   }

  //   // if (leagueStandingsJSON === '[]') {
  //   //   this.percent = 100; // User knows all the teams
  //   // } else if (!leagueStandingsJSON) {
  //   //   this.percent = 0; // User doesn't know any teams
  //   // } else {
  //   //   const teams = JSON.parse(leagueStandingsJSON);
  //   //   const totalTeams = teams.length;

  //   //   // Track how many teams the user knows
  //   //   let knownTeamsCount = 0;

  //   //   // Check if the user knows each team
  //   //   for (const team of teams) {
  //   //     const foundTeam = this.leagues.find((league) => league.id === team.id);
  //   //     if (foundTeam) {
  //   //       knownTeamsCount++;
  //   //     }
  //   //   }

  //   //   if (knownTeamsCount === 0) {
  //   //     this.percent = 0; // User doesn't know any teams
  //   //   } else {
  //   //     const percentageKnown = (knownTeamsCount / totalTeams) * 100;
  //   //     this.percent = Math.min(100, Math.max(0, Math.floor(percentageKnown)));
  //   //   }
  //   // }

  //   return this.percent;
  // }


  // percentNumber(leagueId: string) {
  //   const standingsByLeagueId = `standings_${leagueId}`;
  //   const leagueStandingsJSON = localStorage.getItem(standingsByLeagueId);
  //   const leagueStandingsArray = JSON.parse(leagueStandingsJSON!);

  //   if (Array.isArray(leagueStandingsArray)) {
  //     const numberOfGroups = leagueStandingsArray.length;
  //     console.log("Number of groups: " + numberOfGroups);

  //     const percentage = ((20 - numberOfGroups) / 20) * 100;
  //     console.log("Percentage: " + percentage + "%");

  //     return percentage;
  //   } else {
  //     console.log("Invalid JSON format");
  //     return null; 
  //   }
  // }
  leagueStandingsArray: any[] = [] // Define and populate this property as needed
  totalGroups: number = -1;
  percentNumber(leagueId: string, totalGroups: number) {
    const standingsByLeagueId = `standings_${leagueId}`;
    const leagueStandingsJSON = localStorage.getItem(standingsByLeagueId);
    const leagueStandingsArray = JSON.parse(leagueStandingsJSON!);
  
    if (Array.isArray(leagueStandingsArray)) {
      const numberOfGroups = leagueStandingsArray.length;
      console.log("Number of groups: " + numberOfGroups);
  
      // Calculate the percentage
      const percentage = ((totalGroups - numberOfGroups) / totalGroups) * 100;
      console.log("Percentage: " + percentage + "%");
  
      // Now you have the 'percentage' value that starts from 0 and increases as the number of groups decreases relative to 'totalGroups'.
      return percentage;
    } else {
      console.log("Invalid JSON format");
      return null; // You can return an appropriate value in case of an error.
    }
  }

}
