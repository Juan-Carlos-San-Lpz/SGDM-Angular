import { DireccionService } from './../../services/direccion.service';
import { Direccion } from './../../models/direccion';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-prueba-direccion',
  templateUrl: './prueba-direccion.component.html',
  styleUrls: ['./prueba-direccion.component.css'],
  providers: [DireccionService],
})
export class PruebaDireccionComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public direccion: Direccion;
  public status: string;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  dataEstado: any;
  dataMunicipio: any;
  dataColonia: any;
  dataCp: any;
  public url: string;
  closeResult = '';

  constructor(
    private _direccionServicio: DireccionService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Genero musical';

    this.direccion = new Direccion(null, '', '', '', '', '', 1);
  }

  ngOnInit(): void {
    this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      order: [0, 'asc'],
      processing: true,
      autoFill: true,
      keys: true,
      info: true,
      colReorder: true,
      autoWidth: true,
      lengthChange: true,
      buttons: ['copy', 'excel', 'csv', 'pdf', 'colvis'],
      dom: 'Blfrtip',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json',
      },
      responsive: true,
      rowReorder: {
        dataSrc: 'race.order',
      },
    };
    this._direccionServicio.getEstado().subscribe((res: any) => {
      console.log(res);

      this.dataEstado = res.response.estado;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.dataEstado);
    });
  }

  onMunicipio(form) {
    console.log('Esto hay en el estado ' + form.value);
    // sacar el id del usuario
    let estado = form.value;
    console.log(estado);

    //peditcion ajax al servicio para sacar los datos
    this._direccionServicio.getMunicipio(estado).subscribe(
      (res: any) => {
        console.log(res);

        this.dataMunicipio = res.response.municipios;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        console.log('que hay en dataMunicipio?  ' + this.dataMunicipio);
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(['/prueba/direccion']);
      }
    );
  }

  onCP(form) {
    console.log('este es el municipio ' + form.value);
    // sacar el id del usuario
    let municipio = form.value;
    console.log(municipio);

    //peditcion ajax al servicio para sacar los datos
    this._direccionServicio.getCp(municipio).subscribe(
      (res: any) => {
        console.log(res);

        this.dataCp = res.response.cp;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        console.log('que hay en dataCp?  ' + this.dataCp);
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(['/prueba/direccion']);
      }
    );
  }

  onColonia(form) {
    console.log('este es el CP ' + form.value);
    // sacar el id del usuario
    let cp = form.value;
    console.log(cp);

    //peditcion ajax al servicio para sacar los datos
    this._direccionServicio.getColonia(cp).subscribe(
      (res: any) => {
        console.log('esta es el res ' + res);

        this.dataColonia = res.response.colonia;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        console.log('que hay en dataColonia?  ' + this.dataColonia);
      },
      (error) => {
        console.log('entra al error? ');

        console.log(<any>error);
        this._router.navigate(['/prueba/direccion']);
      }
    );
  }
}
