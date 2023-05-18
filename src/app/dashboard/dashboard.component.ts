import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { LoanAccount } from "app/models/account";

declare var $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @Input() selectedAccount: LoanAccount = null;
  @Input() loanAccounts: LoanAccount[] = [];
  @Output() selectAccountEvent = new EventEmitter<LoanAccount>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    "accountNo",
    "originalLoan",
    "loanBalance",
    "amountPaid",
    "status",
  ];
  dataSource = new MatTableDataSource<LoanAccount>();

  constructor() {}

  ngOnInit() {
    this.dataSource.data = this.loanAccounts;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  selectAccount = (account: LoanAccount) => {
    this.selectedAccount = account;
    this.selectAccountEvent.emit(account);
  };

  getTotalLoanBalance = () => {
    if (this.selectedAccount) {
      return this.selectedAccount.loanBalance;
    }
    return this.loanAccounts.reduce(
      (sum, account) => sum + account.loanBalance,
      0
    );
  };

  getTotalRepaidAmount = () => {
    if (this.selectedAccount) {
      return this.selectedAccount.amountPaid
    }
    return this.loanAccounts.reduce(
      (sum, account) => sum + account.amountPaid,
      0
    );
  };
}
