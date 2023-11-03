import { Component, OnInit } from '@angular/core';
import Standing from 'src/app/models/Standing';
import { StandingService } from 'src/app/services/standing.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {

  leagueId: string = "";
  currentIndex: number = 0;
  standings: Standing[] = [];
  teamName: string = "";
  isCorrect: boolean | null = null;
  currentHelpIndex: number = 0;
  teamHelpVisible: boolean = true;
  displayedTeamHelp: { label: string; value: string }[] = [];

  constructor(private standingService: StandingService, private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.leagueId = localStorage.getItem('LeagueId')!;
    const leagueStandingsJSON = localStorage.getItem(`standings_${this.leagueId}`);
    if (leagueStandingsJSON) {
      this.standings = JSON.parse(leagueStandingsJSON);
    } else {
      this.getStandingByLeagueId();
    }

    if (leagueStandingsJSON === '[]') {
      this.openMessageDialog('Error',
        `You finished the trivia about ${this.leagueId} league. You can press the reset button to start over`, false);
      this.router.navigate(['trivia']);
    }
  }

  getStandingByLeagueId() {
    this.standingService.getStandingByLeagueId(this.leagueId).subscribe((standings) => {
      this.standings = standings;
      localStorage.setItem(`standings_${this.leagueId}`, JSON.stringify(this.standings));
    });
  }

  isInputCorrect() {
    if (this.standings[this.currentIndex] && this.teamName) {
      const currentTeam = this.standings[this.currentIndex];

      if (currentTeam.name.trim().toLowerCase() === this.teamName.trim().toLowerCase()) {
        this.clearDisplayedTeamHelp();

        this.standings = this.standings.filter(team => team !== currentTeam);

        localStorage.setItem(`standings_${this.leagueId}`, JSON.stringify(this.standings));

        if (this.standings.length === 0) {
          this.openMessageDialog('Success', `Well done! You finished the ${this.leagueId} league`, true);
          this.router.navigate(['/trivia']);
        }
        else {
          this.moveToNextTeam();
          this.openMessageDialog('Success', 'Correct answer!', true);
        }


      } else {
        this.openMessageDialog('Error', 'Incorrect answer.', false);
      }
    }
    else if (this.teamName.length === 0) {
      this.openMessageDialog('Error', 'Team name is empty.', false);
    }
  }

  moveToNextTeam() {
    if (this.currentIndex < this.standings.length - 1) {
      this.teamName = "";
      this.isCorrect = null;
    }
  }


  openMessageDialog(title: string, message: string, isCorrect: boolean) {
    this.dialog.open(MessageDialogComponent, {
      data: { title, message, isCorrect },
    });
  }



  clearDisplayedTeamHelp() {
    this.displayedTeamHelp = [];
  }

  showTeamHelp() {
    if (this.standings[this.currentIndex]) {

      this.standingService.HelpConditions
        (this.standings, this.currentIndex, this.currentHelpIndex, this.displayedTeamHelp)

      this.currentHelpIndex++;

      if (this.currentHelpIndex >= 5) {
        this.currentHelpIndex = 0;
      }
    }

  }

  isHelpButtonDisabled(): boolean {
    return this.displayedTeamHelp.length >= 5;
  }

}
