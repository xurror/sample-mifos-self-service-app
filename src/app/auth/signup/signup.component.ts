import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/core/authentication/authentication.service';
import { Logger } from 'app/core/logger/logger.service';
import { BaseErrorStateMatcher, basicControl, passwordsMatchValidator } from 'app/utils/validators';
import { finalize } from 'rxjs/operators';

const log = new Logger("SignupComponent");
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  loading = false;
  errorStateMatcher = new BaseErrorStateMatcher();

  signupForm: FormGroup = new FormGroup(
    {
      accountNumber: basicControl(),
      firstName: basicControl(),
      lastName: basicControl(),
      username: basicControl(),
      mobileNumber: new FormControl("", [
        Validators.required,
        // Validators.pattern(/^\\+?[0-9. ()-]{0,25}$/g),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      confirmPassword: new FormControl("", [Validators.required]),
    },
    {
      validators: passwordsMatchValidator,
    }
  );

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  signup() {
    log.debug("Sign Up");
    this.loading = true;
    this.signupForm.disable();
    this.authService
      .register({ ...this.signupForm.value, authenticationMode: "email" })
      .pipe(
        finalize(() => {
          this.signupForm.get("password").reset();
          this.signupForm.get("confirmPassword").reset();
          this.signupForm.markAsPristine();
          this.signupForm.enable();
          this.loading = false;
        })
      )
      .subscribe();
  }
}
