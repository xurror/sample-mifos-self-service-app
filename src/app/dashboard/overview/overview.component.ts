import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { Logger } from "app/core/logger/logger.service";
import { LoanAccountOverview } from "app/models/account";
import { BaseErrorStateMatcher } from "app/utils/validators";

declare var $: any;
const log = new Logger("OverviewComponent");

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit, AfterViewInit {
  @Input() clientId: number = null;
  @Input() selectedLoanId: number = null;
  @Output() selectAccountEvent = new EventEmitter<number>();
  @Output() loansAccountProductTemplate = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  errorStateMatcher = new BaseErrorStateMatcher();

  loanProductSelected = false;

  locale = "en";
  dateFormat = "dd MMMM yyyy";

  productData: any;
  loanOfficerOptions: any;
  loanPurposeOptions: any;
  fundOptions: any;
  accountLinkingOptions: any;
  termFrequencyTypeData: [];

  accountDetails = {};
  loanTermDetails = {};

  repaymentForm: FormGroup;
  loanSelected = null;

  loansAccountDetailsForm: FormGroup;

  displayedColumns: string[] = [
    "accountNo",
    // "originalLoan",
    "loanBalance",
    "amountPaid",
    "status",
    "lastRepaymentDate",
  ];
  dataSource = new MatTableDataSource<LoanAccountOverview>();

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
    this.createLoansAccountDetailsForm();
    this.buildDependencies();
    this.createRepaymentForm();
  }

  ngOnInit() {
    this.fetchLoanAccounts();
    this.http
      .get(`/loanproducts`, { params: { clientId: this.clientId } })
      .subscribe((data) => {
        log.debug("Loan Products:", data);
        this.productData = data;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  today = (): string => {
    return this.datePipe.transform(new Date(), this.dateFormat);
  }

  getLoanTemplate(productId: number) {
    return this.http.get(`/loans/template`, {
      params: { templateType: "individual", productId: productId },
    });
  }

  fetchLoanAccounts() {
    this.http
      .get(`/clients/${this.clientId}/accounts`)
      .subscribe((data: any) => {
        log.debug("Accounts Res:", data);
        this.dataSource.data = data?.loanAccounts as LoanAccountOverview[];
      });
  }

  selectAccount = (account: LoanAccountOverview) => {
    this.selectedLoanId = account.id;
    this.selectAccountEvent.emit(account.id);
  };

  getTotalLoanBalance = () => {
    if (this.selectedLoanId) {
      return this.dataSource.data.find(
        (account) => account.id == this.selectedLoanId
      ).loanBalance;
    }
    if (this.dataSource.data) {
      return this.dataSource.data.reduce(
        (sum, account) => (sum ?? 0) + (account.loanBalance ?? 0),
        0
      );
    }
    return 0;
  };

  getTotalRepaidAmount = () => {
    if (this.selectedLoanId) {
      return this.dataSource.data.find(
        (account) => account.id == this.selectedLoanId
      ).amountPaid;
    }
    if (this.dataSource.data) {
      return this.dataSource.data.reduce(
        (sum, account) => (sum ?? 0) + (account.amountPaid ?? 0),
        0
      );
    }
    return 0;
  };

  submitLoanApplication = () => {
    if (this.loansAccountDetailsForm.invalid) {
      return;
    }
    const formData = this.loansAccountDetailsForm.value;

    const payload = {
      ...this.accountDetails,
      ...this.loanTermDetails,
      ...formData,
      clientId: this.clientId,
      autoDisburse: true,
      loanType: "individual",
      dateFormat: this.dateFormat,
      locale: this.locale,
    };

    log.debug("Loan Payload:", payload);
    this.http
      .post(`/loans`, payload, {
        params: { command: "" },
      })
      .subscribe({
        next: (data) => {
          log.debug("Loan Application Response:", data);
          this.loansAccountDetailsForm.reset();
          this.loanProductSelected = false;
          this.fetchLoanAccounts();
          $("#newLoanAccount").modal("toggle");
        },
        error: (err) => {
          log.debug("Loan Application Error:", err);
        },
      });
  };

  makeRepayment = () => {
    if (this.repaymentForm.invalid) {
      return;
    }
    const loanId = this.repaymentForm.value.loanId;
    const payload = {
      transactionAmount: this.repaymentForm.value.transactionAmount,
      dateFormat: this.dateFormat,
      transactionDate: this.today(),
      locale: this.locale,
      externalId: "",
      paymentTypeId: "",
      note: "",
    };
    log.debug("Repayment Payload:", payload)
    this.http
      .post(`/loans/${loanId}/transactions`, payload, {
        params: { command: "repayment" },
      })
      .subscribe({
        next: (data) => {
          log.debug("Loan Repayment Response:", data);
          this.repaymentForm.reset();
          this.loanSelected = null;
          this.fetchLoanAccounts();
          $("#makeRepayment").modal("toggle");
        },
        error: (err) => {
          log.debug("Loan Repayment Error:", err);
        },
      });
  };

  setupNewLoanAccountForm() {}

  createLoansAccountDetailsForm() {
    this.loansAccountDetailsForm = this.formBuilder.group({
      productId: ["", Validators.required],
      principal: ["", Validators.required],
    });
  }

  createRepaymentForm() {
    this.repaymentForm = this.formBuilder.group({
      loanId: ["", Validators.required],
      transactionAmount: ["", Validators.required],
    });
    this.repaymentForm
      .get("loanId")
      .valueChanges.subscribe((loanId: number) => {
        if (loanId) {
          this.getRepaymentTemplate(loanId).subscribe((template: any) => {
            log.debug("Repayment Template:", template);
            const loan = this.dataSource.data.find(
              (account) => account.id == loanId
            );
            this.loanSelected = {
              ...loan,
              ...template
            }
            this.repaymentForm.patchValue({
              transactionAmount: template.amount,
            });
            this.repaymentForm.get('transactionAmount').addValidators([Validators.max(this.loanSelected.loanBalance)])
          })
        }
      });
  }

  getRepaymentTemplate(loanId: number) {
    return this.http.get(`/loans/${loanId}/transactions/template`, {
      params: {
        command: "repayment",
        loanId,
        dateFormat: this.dateFormat,
        transactionDate: this.today(),
        locale: this.locale,
      },
    });
  }

  buildDependencies() {
    this.loansAccountDetailsForm
      .get("productId")
      .valueChanges.subscribe((productId: number) => {
        if (productId) {
          this.getLoanTemplate(productId).subscribe((response: any) => {
            log.debug("Loan Template:", response);
            this.termFrequencyTypeData = response.termFrequencyTypeOptions;
            this.loanOfficerOptions = response.loanOfficerOptions;
            this.loanPurposeOptions = response.loanPurposeOptions;
            this.fundOptions = response.fundOptions;
            this.accountLinkingOptions = response.accountLinkingOptions;
            this.loanProductSelected = true;
            if (response.createStandingInstructionAtDisbursement) {
              this.loansAccountDetailsForm
                .get("createStandingInstructionAtDisbursement")
                .patchValue(response.createStandingInstructionAtDisbursement);
            }

            this.accountDetails = {
              productId: response.loanProductId,
              submittedOnDate: this.today(),
              loanOfficerId: response.loanOfficerId,
              loanPurposeId: response.loanPurposeId,
              fundId: response.fundId,
              expectedDisbursementDate: this.today(),
              externalId: response.externalId,
              loanTermFrequency: response.termFrequency,
              loanTermFrequencyType: response.termPeriodFrequencyType.id,
              numberOfRepayments: response.numberOfRepayments,
              repaymentEvery: response.repaymentEvery,
              repaymentFrequencyType: response.repaymentFrequencyType.id,
            };

            this.loansAccountDetailsForm.patchValue({
              principal: response.principal,
            });

            this.loanTermDetails = {
              interestRatePerPeriod: response.interestRatePerPeriod,
              amortizationType: response.amortizationType.id,
              isEqualAmortization: response.isEqualAmortization,
              interestType: response.interestType.id,
              interestCalculationPeriodType:
                response.interestCalculationPeriodType.id,
              transactionProcessingStrategyCode:
                response.transactionProcessingStrategyCode,

              charges: response.product.charges,
            };
          });
        }
      });
  }

  getLoanStatus(status: any) {
    let value;
    switch (status.id) {
      case 100:
        value = "Pending Approval";
        break;
      case 200:
        value = "Pending Disbursal";
        break;
      case 300:
        value = "Active";
        break;
      case 600:
        value = "Closed";
        break;
      case 601:
        value = "Written Off";
        break;
      case 602:
        value = "Rescheduled";
        break;
      case 700:
        value = "Overpaid";
        break;
    }
    return value;
  }
}
