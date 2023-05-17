import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-detail-filter',
  templateUrl: './detail-filter.component.html',
  styleUrls: ['./detail-filter.component.css']
})
export class DetailFilterComponent  implements OnInit {

  errorSize =0
  succesSize =0
  listArrMessageOriginal =[]
  listArrMessage =[]
  filtro=""

  displayedColumns:any = ['position','nombreToken','estadoToken','telefono','mensaje','fechaEnvio','estadoMensaje','errorMsj'];
   
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<DetailFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: MatSnackBar
  ) {
   
    this.listArrMessage=data
    console.log(this.listArrMessage)
  }
  ngOnInit(): void {

  }

  applyFilter(): void {
    let filterValue =this.filtro.trim().toLowerCase()
    this.listArrMessage = this.listArrMessageOriginal.filter((objeto:any) => {
    // Buscar en las propiedades "telefono" y "mensaje" del objeto
    return objeto.telefono.trim().toLowerCase().includes(filterValue) || 
    objeto.mensaje.trim().toLowerCase().includes(filterValue)||
    objeto.fechaEnvio.trim().toLowerCase().includes(filterValue)||
    objeto.status.trim().toLowerCase().includes(filterValue)
    });
    console.log(this.listArrMessage)
  }
}
