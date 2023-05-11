import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { QrModalComponent } from './components/qr-modal/qr-modal.component';
import { apiUrl, socketUrl } from 'src/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isMenuOpen: boolean = false;
  qrImageData: string = '';
  dataToParse: string = '';
  generatedToken: string = '';
  tokens: any = [];
  routes = [
    {
      name: 'Inicio',
      path: '/',
      icon: 'home',
    },
    {
      name: 'Generar Whatsapp Token',
      path: '/wpp',
      icon: 'phone',
    },
  ];
  constructor(
    private authService: AuthService,
    private matDialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.listTokens().subscribe(
      ({
        responseExSave: {
          data: { 0: tokens },
        },
      }) => {
        console.log(tokens);
        this.tokens = tokens ?? [];
      }
    );
  }

  // genereteQrCode() {
  //   this.authService.getQrToken().subscribe((data) => {
  //     const {
  //       responseExSave: { codigoQr },
  //     } = data;
  //     if (codigoQr) {
  //       this.matDialog.open(QrModalComponent, {
  //         data: {
  //           imageData: codigoQr,
  //         },
  //       });
  //     }
  //   });
  // }
  generateQrCode() {
    this.matDialog
      .open(QrModalComponent, {})
      .afterClosed()
      .subscribe(({ token, status }) => {
        if (status == 408) {
          this._snackbar.open('Excedio el tiempo limite para iniciar sesión');
        } else {
          this._snackbar.open('Se Generó el token Correctamente');
          this.generatedToken = token;
        }
      });
  }
  showToken() {
    this.dataToParse = this.generatedToken;
  }

  logout() {
    return this.authService.logout();
  }
}
