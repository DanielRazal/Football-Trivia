import { Component, OnInit } from '@angular/core';
import Standing from 'src/app/models/Standing';
import { StandingService } from 'src/app/services/standing.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

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


  constructor(private standingService: StandingService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.leagueId = localStorage.getItem('LeagueId')!;
    // const standingsJSON = localStorage.getItem('standings');
    // if (standingsJSON) {
    //   this.standings = JSON.parse(standingsJSON);
    // } else {
    this.getStandingByLeagueId();
    // }
  }

  getStandingByLeagueId() {
    this.standingService.getStandingByLeagueId(this.leagueId).subscribe((standings) => {
      this.standings = standings;
      // localStorage.setItem('standings', JSON.stringify(this.standings));
      console.log(this.standings);
    });
  }

  isInputCorrect() {
    if (this.standings[this.currentIndex] && this.teamName) {
      const currentTeam = this.standings[this.currentIndex];

      if (currentTeam.name.toLowerCase() === this.teamName.toLowerCase()) {
        this.clearDisplayedTeamHelp();
        this.moveToNextTeam();
        currentTeam.isCorrect = true;
        this.openMessageDialog('Success', 'Correct answer!', true);

        // const index = this.standings.indexOf(currentTeam);
        // if (index !== -1) {
        //   this.standings.splice(index, 1);
        //   localStorage.setItem('standings', JSON.stringify(this.standings));
        // }
      } else {
        this.openMessageDialog('Error', 'Incorrect answer.', false);
      }
    } else if (this.teamName.length === 0) {
      this.openMessageDialog('Error', 'Team name is empty.', false);
    }
  }


  openMessageDialog(title: string, message: string, isCorrect: boolean) {
    this.dialog.open(MessageDialogComponent, {
      data: { title, message, isCorrect },
    });
  }


  moveToNextTeam() {
    if (this.currentIndex < this.standings.length - 1) {
      this.currentIndex++;
      this.teamName = "";
      this.isCorrect = null;
    }
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
