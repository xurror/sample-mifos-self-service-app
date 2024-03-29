import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/core/authentication/authentication.service";
import { Logger } from "app/core/logger/logger.service";
import { BaseErrorStateMatcher } from "app/utils/validators";
import { finalize } from "rxjs/operators";

const log = new Logger("LoginComponent");

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loading = false;
  errorStateMatcher = new BaseErrorStateMatcher();
  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      // Validators.pattern(/^\\+?[0-9. ()-]{0,25}$/g),
    ]),
    password: new FormControl("", [Validators.required]),
    remember: new FormControl(false, [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/"], { replaceUrl: true });
    }
  }

  login() {
    log.debug("Login");
    this.loading = true;
    this.loginForm.disable();
    this.authService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          log.debug("Login Response:", data);
          this.router.navigate(["/"], { replaceUrl: true });
        },
        error: (err) => {
          log.debug("Failed to login:", err);
          this.loginForm.reset();
          this.loginForm.markAsPristine();
          this.loginForm.enable();
        }
      });
  }

  forgotPassword() {
    log.debug("Forgot Password feature currently unavailable.");
  }
}
