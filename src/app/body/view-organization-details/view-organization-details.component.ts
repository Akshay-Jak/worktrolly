import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organizations } from 'src/app/Interface/OrganizationInterface';
import { Team } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';

@Component({
  selector: 'app-view-organization-details',
  templateUrl: './view-organization-details.component.html',
  styleUrls: ['./view-organization-details.component.css']
})
export class ViewOrganizationDetailsComponent implements OnInit {

  organization: Organizations;
  teams: Team[] = []
  showLoader: boolean = true;
  showTeamsDetails: boolean = true;
  showOrgDocuments: boolean = false;

  constructor(public startService: StartServiceService, public backendService: BackendService, public authService: AuthService, public applicationSettingsService: ApplicationSettingsService, public router: Router, public navbarHandler: NavbarHandlerService, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar("ORGANIZATION DETAILS");

    if(this.startService.showTeams) {
      this.getOrganizationDetails();
    } else {
      this.startService.startApplication();
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.getOrganizationDetails();
        }
      });
    }


    // this.authService.afauth.user.subscribe(data => {
    //   this.authService.userAppSettingObservable.subscribe(data => {
    //     this.getOrganizationDetails();
    //   });
    // });
  }

  getOrganizationDetails() {
    this.showLoader = true;
    const appKey = this.authService.getAppKey();
    this.teams = [];
    this.backendService.getOrgDetails(appKey).subscribe(data => {
      this.organization = data;
      this.organization.TeamsId.forEach(teamId => {
        this.getTeamDetails(teamId);
      });
      this.showLoader = false;
    });
  }

  getTeamDetails(teamId: string) {
    this.applicationSettingsService.getTeamDetails(teamId).subscribe(data => {
      this.teams.push(data);
    });
  }

  createTeam() {
    this.popupHandlerService.createNewTeamEnabled = true;
  }

  updatedDetails(data) {
    if(data) {
      this.getOrganizationDetails();
    }
  }

  switchView(data: any){
    this.showTeamsDetails = false;
    this.showOrgDocuments = false;

    if(data == "showTeamsDetails") {
      this.showTeamsDetails = true;
    } else {
      this.showOrgDocuments = true;
    }
  }
}