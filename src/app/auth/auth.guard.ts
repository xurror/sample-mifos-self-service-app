import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuthenticated().pipe(
      map((response) => {
        if (response) {
          return true;
        }
        this.router.navigate(["/auth"]);
        return false;
      }),
      catchError((error) => {
        this.router.navigate(["/auth"]);
        return of(false);
      })
    );
    return true;
  }
}
