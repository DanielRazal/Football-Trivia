import { Component, OnInit } from '@angular/core';
import Standing from 'src/app/models/Standing';
import { StandingService } from 'src/app/services/standing.service';

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

  constructor(private standingService: StandingService) { }

  ngOnInit(): void {
    this.leagueId = localStorage.getItem('LeagueId')!;

    this.getStandingByLeagueId();
  }


  getStandingByLeagueId() {
    this.standingService.getStandingByLeagueId(this.leagueId).subscribe((standings) => {
      this.standings = standings;
      console.log(this.standings)
    })
  }

  isInputCorrect() {
    if (this.standings[this.currentIndex] && this.teamName) {
      const currentTeamName = this.standings[this.currentIndex].name;
      this.isCorrect = currentTeamName.toLowerCase() === this.teamName.toLowerCase();
      if (this.isCorrect) {
        this.moveToNextTeam();
      }
    }
  }

  moveToNextTeam() {
    if (this.currentIndex < this.standings.length - 1) {
      this.currentIndex++;
      this.teamName = "";
      this.isCorrect = null;
    }
  }



  // nextTeam() {
  //   if (this.currentIndex < this.standings.length - 1) {
  //     this.currentIndex++;
  //   }
  // }

  // prevTeam() {
  //   if (this.currentIndex > 0) {
  //     this.currentIndex--;
  //   }
  // }

}
