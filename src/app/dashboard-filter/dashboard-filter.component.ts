import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.css']
})
export class DashboardFilterComponent implements OnInit {
  isMenuOpen: boolean = true;
  config = new MatSnackBarConfig();
  displayedColumns:any = ['position','nombreUsuario','tiempoIlimitado','tiempoExpiracion','numeroMensajes','nombreToken','token','acciones','accionesDelete'];
  listTable: any = [];
  isNameOpen:string="Dashboard"
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
  }
  logout() {
    return this.authService.logout();
  }
}
