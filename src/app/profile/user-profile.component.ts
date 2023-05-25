import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/core/authentication/authentication.service';
import { Logger } from 'app/core/logger/logger.service';

const log = new Logger("UserProfileComponent");

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  
  appUser;
  client;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.appUser = this.authService.getCredentials();
    this.createProfileForm();
  }

  ngOnInit() {
    log.debug("App User:", this.appUser);
    this.http
      .get(`/clients/${this.appUser.clients[0]}`)
      .subscribe((data: any) => {
        log.debug("Client Data:", data);
        this.client = data;
        this.profileForm.patchValue({
          externalId: data.externalId,
          firstName: data.firstname,
          middleName: data.middlename,
          lastName: data.lastname,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          mobileNo: data.mobileNo,
          email: data.email,
        });
      });
  }

  createProfileForm = () => {
    this.profileForm = this.formBuilder.group({
      externalId: [""],
      firstName: [""],
      middleName: [""],
      lastName: [""],
      dateOfBirth: [""],
      gender: [""],
      mobileNo: [""],
      email: [""],
    });
  };
}
