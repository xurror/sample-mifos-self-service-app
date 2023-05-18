import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LoanAccount } from 'app/models/account';

@Component({
  selector: "app-loan-account",
  templateUrl: "./loan-account.component.html",
  styleUrls: ["./loan-account.component.css"],
})
export class LoanAccountComponent implements OnInit {
  @Input() account: LoanAccount = null;
  @Output() close = new EventEmitter<string>();

  details: Detail[] = []

  constructor() {}

  ngOnInit() {
    for (const key in this.account) {
      switch (key) {
        case "repaymentStrategy":
          this.details.push({
            header: "Repayment Strategy",
            value: this.account[key],
          });
          break;
        case "repayments":
          this.details.push({
            header: "Repayments",
            value: this.account[key],
          });
          break;
        case "interest":
          this.details.push({
            header: "Interest",
            value: this.account[key],
          });
          break;
        case "interestCalculationPeriod":
          this.details.push({
            header: "Interest Calculation Period",
            value: this.account[key],
          });
          break;
        case "interestType":
          this.details.push({
            header: "Interest Type",
            value: this.account[key],
          });
          break;
        case "submittedOn":
          this.details.push({
            header: "Submitted On",
            value: this.account[key],
          });
          break;
        case "approvedOn":
          this.details.push({
            header: "Approved On",
            value: this.account[key],
          });
          break;
        case "disbursedOn":
          this.details.push({
            header: "Disbursed On",
            value: this.account[key],
          });
          break;
      }
    }
  }

  clearSelection() {
    this.close.emit("Close Account Component");
  }
}

export interface Detail {
  header: string;
  value: string;
}
