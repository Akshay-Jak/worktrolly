import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
<<<<<<< HEAD
import { ThemeService } from '../services/general/theme.service';
=======
import { BackendService } from '../services/backend.service';
import { ThemeService } from '../services/theme.service';
>>>>>>> 8e527f38f34408fb0a7dac1ace93c6502e5a26b8

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public backendService: BackendService, public authService: AuthService, public themeService: ThemeService) { }

  ngOnInit(): void {
  }

  startNewSprint() {
    this.router.navigate(['/StartNewSprint']);
  }

  startNewSession() {
    this.router.navigate(['/CreateNewSession']);
  }

  Board(){
    this.router.navigate(['/Board']);
  }

  myDashBoard(){
    console.log("load MyDashboard");
    this.router.navigate(["/MyDashboard"])
  }

  createTeam(){
    this.router.navigate(['/CreateTeam']);
  }

  updateTeam(){
    this.router.navigate(['/UpdateTeam', this.authService.getTeamId()]);
  }

  createNewOrganization() {
    this.router.navigate(['/CreateNewOrganization']);
  }
}
