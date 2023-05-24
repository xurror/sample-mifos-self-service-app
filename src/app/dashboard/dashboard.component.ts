import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'app/core/authentication/authentication.service';
import { Logger } from 'app/core/logger/logger.service';
  
declare var $: any;
const log = new Logger("HomeComponent");

@Component({
  selector: "app-home",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  clientId;
  selectedLoanId;
  responseAccounts = [];
  
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.clientId = this.authService.getCredentials().clients[0];
    this.http.get(`/clients/${this.clientId}/accounts`).subscribe((data) => {
      log.debug("Accounts Res:", data);
    });
  }

  ngOnInit() {}

  selectAccount($event: number) {
    console.log("LoanAccountComponent Receieved Select Event: ", $event);
    this.selectedLoanId = $event;
  }

  resetSelection($event: number) {
    this.selectedLoanId = null;
    console.log("LoanAccountComponent Receieved Reset Event: ", $event);
  }
}
