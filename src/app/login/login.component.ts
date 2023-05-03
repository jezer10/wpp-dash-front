import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
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
    this.authService.testAuth(this.loginForm.value).subscribe(({ token }) => {
      if (token) {
        this.router.navigate(['/']);
        this.snackbar.open('Se inicio Sesión Correctamente', '', {
          duration: 3000,
        });
      } else {
        this.snackbar.open('Credenciales Incorrectas', '', {
          duration: 3000,
        });
      }
    });
  }
}
