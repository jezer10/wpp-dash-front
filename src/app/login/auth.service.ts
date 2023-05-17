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
  getNewQrToken(
    nombreToken: string,
    tiempoIlimitado: boolean,
    tiempoExpiracion: Date,
    numeroMensajes: number,
    ipAddress:string
  ) {
    return this.http.post<any>(
      `${this.baseUrl}/Login`,
      {
        nombreToken,
        tiempoIlimitado,
        tiempoExpiracion,
        tiempoExpiracionHoras: 87,
        numeroMensajes,
        ipAddress
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        }),
      }
    );
  }
  listTokens() {
    return this.http.get<any>(`${this.baseUrl}/ListToken`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }
  deleteToken(nombreToken: string) { 
    return this.http.post<any>(`${this.baseUrl}/DeleteToken`,
    {
      nombreToken
    },
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }
  listTokenHistorial(nombreToken: string,fechaInicio: any,fechaFin: any,telefono: any) { 
    return this.http.post<any>(`${this.baseUrl}/ListTokenHistorialFilter`,
    {
      nombreToken,
      fechaInicio,
      fechaFin,
      telefono
    },
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
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
  getMyIp(){
    return this.http.get<any>(`https://api.ipify.org/?format=json`);
  }

  setToken(token: string = '') {
    localStorage.setItem('token', token);
  }

  getTokenPayload() {
    const token = this.getToken();
    let payload;
    if (token) {
      const { user } = JSON.parse(atob(token.split('.')[1]));
      payload = user;
    }
    return payload ?? {};
  }

  getQrToken(): Observable<any> {
    const { id } = this.getTokenPayload();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.post<any>(
      `${this.baseUrl}/Login`,
      {
        userId: id,
      },
      {
        headers,
      }
    );
  }

  logout() {
    this.setToken();
    this.router.navigate(['/login']);
    return true;
  }
}
