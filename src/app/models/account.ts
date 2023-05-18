export interface LoanAccount {
  id: number;
  accountNo: string;
  originalLoan: number;
  loanBalance: number;
  amountPaid: number;
  status: string;
  repaymentStrategy: string;
  repayments: string;
  interest: string;
  interestCalculationPeriod: string;
  interestType: string;
  submittedOn: string;
  approvedOn: string;
  disbursedOn: string;
}

export interface LoanAccountDetails {

}
