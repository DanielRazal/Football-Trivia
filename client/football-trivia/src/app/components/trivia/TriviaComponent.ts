import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import League from 'src/app/models/League';
import Standing from 'src/app/models/Standing';
import { LeagueService } from 'src/app/services/league.service';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

  leagues: League[] = [];
  isAccepted = false;


  constructor(private leagueService: LeagueService,
    private router: Router) { }

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

  getLeagueId(id: string) {
    const standingsKey = `standings_${id}`;
    const standingsData = localStorage.getItem(standingsKey);

    if (!standingsData) {
      this.router.navigate(['team']);
    } else {
      alert('No standings data available for this league.');
    }

    localStorage.setItem("LeagueId", id);
  }




  resetData(leagueId: string) {
    const standingsById = `standings_${leagueId}`;
    if (standingsById) {
      localStorage.removeItem(standingsById);
    }
  }

}
