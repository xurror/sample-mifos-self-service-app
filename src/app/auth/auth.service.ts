import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(private http: HttpClient) {}
  isAuthenticated() {
    return of(true);
    // return this.http.get("/auth/isAuthenticated");
  }
}
