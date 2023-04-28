import * as QRCode from 'qrcode';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isMenuOpen: boolean = false;
  qrImageData: string = '';
  constructor() {}
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
  ngOnInit(): void {}

  genereteQrCode() {
    QRCode.toDataURL('asdfasf', (err, url) => {
      if (err) console.log('error generating url');
      this.qrImageData = url;
    });
  }
}
