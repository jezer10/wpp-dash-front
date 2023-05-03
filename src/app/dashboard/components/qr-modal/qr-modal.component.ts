import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as QRCode from 'qrcode';

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
    private dialogRef: MatDialogRef<QrModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  ngOnInit(): void {
    const { imageData } = this.data;
    QRCode.toDataURL(imageData, (err, url) => {
      if (err) console.log('error generating url');
      this.qrImageData = url;
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
