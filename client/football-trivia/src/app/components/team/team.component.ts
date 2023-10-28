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
  isSpace: boolean = false;
  currentHelpIndex: number = 0;
  teamHelpVisible: boolean = true;
  displayedTeamHelp: { label: string; value: string }[] = [];


  constructor(private standingService: StandingService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.leagueId = localStorage.getItem('LeagueId')!;
    const standingsJSON = localStorage.getItem('standings');
    if (standingsJSON) {
      this.standings = JSON.parse(standingsJSON);
    } else {
      this.getStandingByLeagueId();
    }
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

        const index = this.standings.indexOf(currentTeam);
        if (index !== -1) {
          this.standings.splice(index, 1);
          localStorage.setItem('standings', JSON.stringify(this.standings));
        }
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

  showTeamHelp() {
    if (this.standings[this.currentIndex]) {
      const currentTeamName = this.standings[this.currentIndex].name;

      switch (this.currentHelpIndex) {
        case 0:
          this.displayedTeamHelp.push({ label: 'Length of the team name', value: currentTeamName.length.toString() });
          break;
        case 1:
          this.displayedTeamHelp.push({ label: 'First letter of the team name', value: currentTeamName[0] });
          break;
        case 2:
          this.displayedTeamHelp.push({ label: 'Last letter of the team name', value: currentTeamName.slice(-1) });
          break;
        case 3:
          this.displayedTeamHelp.push({ label: 'Team name contains a space', value: currentTeamName.includes(' ') ? 'Have space' : 'No space' });
          break;
        case 4:
          this.displayedTeamHelp.push({ label: 'Full team name', value: currentTeamName });
          break;
      }

      this.currentHelpIndex++;

      console.log(this.displayedTeamHelp)
    }
  }
  clearDisplayedTeamHelp() {
    this.displayedTeamHelp = [];
  }
}
