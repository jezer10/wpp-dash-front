import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as QRCode from 'qrcode';
import { AuthService } from 'src/app/login/auth.service';
import { socketUrl } from 'src/environment';

interface DialogData {
  imageData: string;
}
@Component({
  templateUrl: './qr-modal.component.html',

  selector: 'qr-modal',
})
export class QrModalComponent implements OnInit {
  qrImageData: string = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<QrModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.connectSocket(this.dialogRef);
  }
  closeDialog(data: any = {}) {
    this.dialogRef.close(data);
  }
  getQrCode() {
    this.qrImageData = '';
    this.authService.getQrToken().subscribe((data) => {
      const {
        responseExSave: { codigoQr },
      } = data;
      console.log(data);
      if (codigoQr) {
        QRCode.toDataURL(codigoQr, (err, url) => {
          if (err) console.log('error generating url');
          this.qrImageData = url;
        });
      }
    });
  }
  connectSocket(dialogRef: MatDialogRef<QrModalComponent>) {
    const { id } = this.authService.getTokenPayload();
    const message = {
      action: 'joinPrivateChannel',
      otherUserId: id,
    };

    const socket = new WebSocket(`${socketUrl}`);
    let salaPrivada = '';
    // Emitir un evento para unirte a una sala privada
    socket.addEventListener('open', (event) => {
      console.log(event);
      this.getQrCode();
    });

    socket.addEventListener('message', function (event) {
      console.log(event);
      let { otherUserId, status, token } = JSON.parse(event.data);
      if (message.otherUserId == otherUserId && typeof status == 'number') {
        dialogRef.close({
          status,
          token,
        });
      }
    });

    // Manejar la respuesta del servidor cuando te unes a la sala privada

    const sendMessage = () => {
      // Enviar un mensaje a la sala privada
      //socket.to('privateChannelMessage').emit({ channelId:salaPrivada, message: 'Hola Servidor privado' }) ;
    };
  }
}
