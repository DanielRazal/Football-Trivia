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
  loading: boolean = true;
  timer: number = 500; 


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
      this.loading = false;
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


  percentNumber(leagueId: string, totalGroups: number) {
    return this.leagueService.percentNumber(leagueId, totalGroups)
  }

  onImageLoad(): void {
    this.loading = true; 
    setTimeout(() => {
      this.loading = false;
    }, this.timer);
  }
}
