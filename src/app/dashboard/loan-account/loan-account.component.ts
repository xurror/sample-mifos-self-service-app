import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Logger } from 'app/core/logger/logger.service';
import { LoanAccountOverview } from "app/models/account";

const log = new Logger("LoanAccountComponent");

@Component({
  selector: "app-loan-account",
  templateUrl: "./loan-account.component.html",
  styleUrls: ["./loan-account.component.css"],
})
export class LoanAccountComponent implements OnInit, OnChanges {
  @Input() loanId: number = null;
  @Output() close = new EventEmitter<string>();

  dateFormat = "dd MMMM yyyy";
  details: Detail[] = [];
  loanAccount = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    log.debug("Something Inited:", this.loanId);
  }

  ngOnChanges() {
    log.debug("Something changed:", this.loanId);
    this.fetchLoanDetails(this.loanId);
  }

  fetchLoanDetails = (loanId) => {
    log.debug("Account:", loanId);
    this.http.get(`/loans/${loanId}`).subscribe((data) => {
      log.debug("Loan Details:", data);
      this.loanAccount = data;
    });
  };

  clearSelection() {
    this.close.emit("Close Account Component");
  }
}

export interface Detail {
  header: string;
  value: string;
}
