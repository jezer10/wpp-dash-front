import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap, throwError } from 'rxjs';
import { apiUrl } from 'src/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = {
    username: 'jezerrazuri',
    password: 'Jafetito1',
  };
  private baseUrl = `${apiUrl}/lead`;

  private testToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  constructor(private http: HttpClient, private router: Router) {}

  authUser(username: string, password: string): Observable<any> {
    // const base64String = Buffer.from(
    //   `${username}:${password}`,
    //   'utf-8'
    // ).toString('base64');
    const headers = new HttpHeaders({
      // Authorization: `Basic ${base64String}`,
    });

    return this.http
      .post<any>(
        `${this.baseUrl}/LoginUser`,
        {
          user: username,
          pass: password,
        },
        { headers }
      )
      .pipe(
        map(({ token }) => {
          if (token) {
            this.setToken(token);
            return true;
          }
          return false;
        })
      );
  }
  testAuth(user: any): Observable<any> {
    const { username, password } = user;
    const base64String = btoa(`${username}:${password}`);
    if (this.user.username == username && this.user.password == password) {
      this.setToken(this.testToken);
      return of({
        token: base64String,
      });
    }
    return of({
      status: false,
    });
  }
  check(): boolean {
    return this.getToken() ? true : false;
    // return this.getToken() == this.testToken;
    //  return this.http.post<boolean>(`${this.baseUrl}/validate`, {});
  }
  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  setToken(token: string = '') {
    localStorage.setItem('token', token);
  }

  logout() {
    this.setToken();
    this.router.navigate(['/login']);
    return true;
  }
}
