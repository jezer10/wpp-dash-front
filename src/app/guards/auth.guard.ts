import { Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.authService.check() == true;
    if (!isAuthenticated) {
      this.router.navigate(['/login']);

      return false;
    }
    return true;
  }
}
