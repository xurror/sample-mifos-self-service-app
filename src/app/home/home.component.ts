import { Component, OnInit } from '@angular/core';
import { LoanAccount } from 'app/models/account';
  
declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  selectedAccount: LoanAccount = null;
  loanAccounts: LoanAccount[] = [
    {
      id: 1,
      accountNo: "000000001",
      originalLoan: 50000,
      loanBalance: 23789,
      amountPaid: 26211,
      status: "Open",
      repaymentStrategy: "Creocore Unique",
      repayments: "12 every 1 Months on ",
      interest: "1.2 per annum (0.1%  Per month) - Declining Balance",
      interestCalculationPeriod: "Same as repayment period",
      interestType: "Declining Balance",
      submittedOn: "26 April 2023",
      approvedOn: "26 April 2023",
      disbursedOn: "26 April 2023",
    },
    {
      id: 2,
      accountNo: "000000001",
      originalLoan: 6000,
      loanBalance: 789,
      amountPaid: 5211,
      status: "Open",
      repaymentStrategy: "Creocore Non Unique",
      repayments: "12 every 2 Months on ",
      interest: "1.2 per annum (0.1%  Per month) - Flat",
      interestCalculationPeriod: "Same as repayment period",
      interestType: "Flat",
      submittedOn: "14 February 2013",
      approvedOn: "14 February 2013",
      disbursedOn: "14 February 2013",
    },
  ];

  ngOnInit() {}

  selectAccount($event: LoanAccount) {
    console.log("LoanAccountComponent Receieved Select Event: ", $event);
    this.selectedAccount = $event;
  }

  resetSelection($event: string) {
    this.selectedAccount = null;
    console.log("LoanAccountComponent Receieved Reset Event: ", $event);
  }
}
