import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { QrModalComponent } from './components/qr-modal/qr-modal.component';
import { apiUrl, socketUrl } from 'src/environment';
import { MatSnackBar,MatSnackBarConfig  } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  config = new MatSnackBarConfig();
  isMenuOpen: boolean = true;
  qrImageData: string = '';
  dataToParse: string = '';
  generatedToken: string = '';
  myIpAddress: string ='Not found ip'
  displayedColumns:any = ['position','nombreUsuario','tiempoIlimitado','tiempoExpiracion','numeroMensajes','nombreToken','token','acciones','accionesDelete'];
  tokens: any = [];
  isNameOpen:string="Generar Whatsapp Token"

  routes = [
    {
      name: 'Generar Whatsapp Token',
      path: '/',
      icon: 'vpn_key',
    },
    {
      name: 'Dashboard',
      path: '/dashboardFilter',
      icon: 'dashboard',
    },
  ];
  constructor(
    private authService: AuthService,
    private matDialog: MatDialog,
    private _snackbar: MatSnackBar,
    private clipboard: Clipboard
  ) {
    
    this.config.verticalPosition = 'top'
    this.config.duration=2400
  }
  

  ngOnInit(): void {
    this.getTokenList()
  }
 
  
  getTokenList(){
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
          this._snackbar.open('Excedio el tiempo limite para iniciar sesión',undefined,this.config);
        } else {
          this._snackbar.open('Se Generó el token Correctamente',undefined,this.config);
          this.generatedToken = token;
          this.getTokenList()
        }
      });
  }
  copyToken(token: string,position:number) {

    this.clipboard.copy(token)
    this._snackbar.open('Se copio el token en el portapapeles...',undefined,this.config);

  }
  deleteToken(token:string) {

    this.authService.deleteToken(token).subscribe(
      ({
        responseExSave: {
            status,
            message 
          },
      }) => {
        console.log(message);
        console.log(status)
        if(status==200) {
          this.getTokenList()
        }

        this._snackbar.open(message,undefined,this.config);

      }
    );
  }
    
  showToken() {
    this.dataToParse = this.generatedToken;
  }

  logout() {
    return this.authService.logout();
  }
}
