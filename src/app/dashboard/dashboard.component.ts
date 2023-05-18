import { Component, OnInit, ElementRef } from '@angular/core';

declare var $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  doubleClick = (event) => {
    $("#newLoanAccount").modal("show");
    // alert(JSON.stringify(event))
  };
}
