import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/authentication/authentication.service';
import { RegistrationContext } from 'app/core/authentication/login-context.model';
import { Logger } from 'app/core/logger/logger.service';
import { BaseErrorStateMatcher, passwordsMatchValidator } from 'app/utils/validators';
import { finalize } from 'rxjs/operators';

const log = new Logger("SignupComponent");
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,50}$/;
const mobileNumberRegex = /^(?=.*\d).{9}$/;

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  loading = false;
  errorStateMatcher = new BaseErrorStateMatcher();
  registrationDetails = null;

  signupForm: FormGroup = new FormGroup(
    {
      accountNumber: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      mobileNumber: new FormControl("", [
        Validators.required,
        Validators.pattern(mobileNumberRegex),
      ]),
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

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  signup() {
    log.debug("Sign Up");
    this.loading = true;
    this.signupForm.disable();

    const userdetails: RegistrationContext = this.signupForm.value
    delete userdetails['confirmPassword'];
    this.authService
      .register({ ...userdetails })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          log.debug("Sign Up Response:", data);
          this.router.navigate(["/auth/login"], { replaceUrl: true });
        },
        error: (err) => {
          log.debug("Failed to register:", err)
          this.signupForm.reset();
          this.signupForm.markAsPristine();
          this.signupForm.enable();
        }
      });
  }
}
