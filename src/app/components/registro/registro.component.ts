import { DireccionService } from './../../services/direccion.service';
import { Direccion } from './../../models/direccion';
import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService, DireccionService],
})
export class RegistroComponent implements OnInit {
  public page_title: string;
  public usuario: Usuario;
  public status: string;
  dataEstado: any;
  dataMunicipio: any;
  dataColonia: any;
  dtOptions: any = {};
  dataCp: any;
  dtTrigger = new Subject<any>();
  public direccion: Direccion;
  closeResult = '';
  public url: string;
  public identity;

  constructor(
    private _usuarioService: UsuarioService,
    private _direccionServicio: DireccionService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Registrate';
    this.identity = this._usuarioService.getIdentity();
    this.usuario = new Usuario(null, 2, '', '', '', '', 1, 1, '', '');
    this.direccion = new Direccion(null, '', '', '', '', '', this.identity.sub);
  }

  ngOnInit(): void {
    console.log('esto es mi identity ' + JSON.stringify(this.identity));

    console.log('componenente de registro lanzado');
    console.log(this._usuarioService.test());
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

  onSubmit(form) {
    console.log(form);

    this._usuarioService.registro(this.usuario).subscribe(
      (response) => {
        if (response.status == 'success') {
          console.log(response);

          this.status = response.status;
          Swal.fire({
            title: 'Exito!',
            text: 'Registro de usuario exitoso',
            icon: 'success',
            confirmButtonText: 'Ok',
          });

          form.reset();
        } else {
          this.status = 'error';
        }
        console.log(response.status);
      },
      (error) => {
        console.log(<any>error);
        this.status = 'error';
        Swal.fire({
          title: 'Error!',
          text: 'Lo sentimos hubo un error al registrar el usuario',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
    this._direccionServicio.create(this.direccion).subscribe(
      (response) => {
        console.log('entra en esta parte la peticion de direccion? ');

        // console.log(response.status);
      },
      (error) => {
        console.log('entra directamente al error de direccion?');

        console.log(<any>error);
        this.status = 'error';
      }
    );
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
