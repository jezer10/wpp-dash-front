import { Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isNotAuthenticated = this.authService.check() == false;

    if (!isNotAuthenticated) {
      this.router.navigate(['/']);

      return false;
    }
    return true;
  }
}
