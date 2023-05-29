import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormControl } from '@angular/forms';
import { DetailFilterComponent } from './components/detail-filter/detail-filter.component';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.css']
})
export class DashboardFilterComponent implements OnInit {

  fechaInicio = new FormControl(new Date(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]));
  fechaFin = new FormControl(new Date());
  nombreToken:string=""
  telefonoFilter:any;



  isMenuOpen: boolean = true;
  config = new MatSnackBarConfig();
  displayedColumns:any = ['position','nombreToken','estadoToken','telefono','mensaje','fechaEnvio','estadoMensaje','errorMsj','acciones'];
  listTable: any = [];
  isNameOpen:string="Dashboard"

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;
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
    this.listTokenHistorial()

  }
  logout() {
    return this.authService.logout();
  }
  filter(){
    let fechaInicio =new Date(this.fechaInicio.value ?this.fechaInicio.value?.toString():'').toLocaleDateString('es-ES').replace("/","-")
    let fechaFin =new Date(this.fechaFin.value ?this.fechaFin.value?.toString():'').toLocaleDateString('es-ES').replace("/","-")
    fechaInicio =fechaInicio.replace("/","-")
    fechaFin =fechaFin.replace("/","-")
    let telefono= this.telefonoFilter == null ? "": this.telefonoFilter
    this.listTokenHistorial(this.nombreToken,fechaInicio,fechaFin,  telefono)
  }
  listTokenHistorial(nombreToken:string ='',fechaInicio: any='',fechaFin: any='',telefono: any=''){
    /*Se envia vacio ,para que no filtre nada*/
    console.log("nombre:"+nombreToken+"fechaI:"+fechaInicio+"fechaF"+fechaFin)

    this.authService.listTokenHistorial(nombreToken,fechaInicio,fechaFin,telefono).subscribe(
      ({
        responseExSave: {
          data
        },
      }) => {
        console.log(data)

        this.listTable = data[0] ?? []
        this.listTable.forEach((element:any) => {
          element.fechaEnvio=this.changeFormatDate(element.fechaEnvio)
        });
        this.dataSource = new MatTableDataSource(this.listTable);

        this.dataSource.paginator = this.paginator;
        
        this.dataSource.sort = this.sort;
      }
    );
  }
  detail(mensaje:any){  

    
    this.matDialog
    .open(DetailFilterComponent, {data: [mensaje]})
    .afterClosed()
    .subscribe(( data:any) => {
      console.log(data)
    });
  }
  changeFormatDate(date:string){
    /*This function change date format to Peru TimeZone*/
    const dateObj = new Date(date);
    const convertedDate = new Date(dateObj.getTime() );
    const options = {
      hour12: true,
      timeZone: 'America/Lima', // Peru's timezone (UTC-5)
      
    };
    const formattedDate = convertedDate.toLocaleString('en-US', options);

    // Obtener los componentes de la fecha
    const [month, day, year, time] = formattedDate.split(', ')[0].split('/');
    const [hour, minute, second, period] = formattedDate.split(', ')[1].split(':');

    // Formatear la fecha en el formato deseado "dd/mm/yyyy, hh:mm:ss AM/PM"
    const formattedDateString = `${day}/${month}/${year}, ${hour}:${minute}:${second}`;
    return formattedDateString
  }
  unidecodeToString(message:any){
    return JSON.parse(message);
  }

}
