import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-input-error",
  templateUrl: "./input-error.component.html",
  styleUrls: ["./input-error.component.scss"],
})
export class InputErrorComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;

  constructor() {}

  ngOnInit(): void {}

  capitalizeFirstLetter(str: string): string {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
