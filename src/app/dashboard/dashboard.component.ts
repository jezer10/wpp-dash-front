import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { QrModalComponent } from './components/qr-modal/qr-modal.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isMenuOpen: boolean = false;
  qrImageData: string = '';
  dataToParse: string = '';
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
  constructor(private authService: AuthService, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  genereteQrCode() {
    this.matDialog.open(QrModalComponent, {
      data: {
        imageData: this.dataToParse,
      },
    });
  }
  logout() {
    return this.authService.logout();
  }
}
