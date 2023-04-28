import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  login() {
    const isAuthTrue = this.authService.login(this.loginForm.value);
    console.log(isAuthTrue)
    if (isAuthTrue) {
      this.router.navigate(['/']);
    } else {
      this.snackbar.open("Credenciales Incorrectas","",{
        duration:3000
      })
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private user = {
    username: 'jezerrazuri',
    password: 'Jafetito1',
  };
  login(user: any) {
    return (
      this.user.username == user.username && this.user.password == user.password
    );
  }
}
