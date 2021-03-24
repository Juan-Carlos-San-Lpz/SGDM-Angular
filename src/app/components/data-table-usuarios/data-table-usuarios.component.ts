import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { global } from './../../services/global';
import * as shajs from 'sha.js';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Direccion } from './../../models/direccion';
import { DireccionService } from './../../services/direccion.service';

@Component({
  selector: 'data-table-usuarios',
  templateUrl: './data-table-usuarios.component.html',
  styleUrls: ['./data-table-usuarios.component.css'],
  providers: [UsuarioService, DireccionService],
})
export class DataTableUsuariosComponent implements OnInit {
  dtOptions: any = {};

  dtTrigger = new Subject<any>();
  data: any;
  public direccion: Direccion;
  public url: string;
  public usuario: Usuario;
  public token;
  closeResult = '';
  public identity;
  public status;
  dataEstado: any;
  dataMunicipio: any;
  dataColonia: any;
  dataCp: any;
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.gif,.jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + '/usuario/upload',
      method: 'POST',
      headers: {
        Authorization: this._usuarioService.getToken(),
      },
      params: {
        page: '1',
      },
      responseType: 'blob',
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Seleccionar archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Arrastrar y soltar',
      attachPinBtn: 'Sube tu avatar de usuario...',
      afterUploadMsg_success: '¡ Subido correctamente !',
      afterUploadMsg_error: '¡ Fallo en la subida !',
      sizeLimit: 'Tamaño máx.',
    },
  };

  constructor(
    private htt: HttpClient,
    private _usuarioService: UsuarioService,
    private _direccionServicio: DireccionService,
    private modalService: NgbModal,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.url = global.url;
    this.identity = this._usuarioService.getIdentity();
    this.usuario = new Usuario(null, 2, '', '', '', '', 1, 1, '', '');
    this.direccion = new Direccion(null, '', '', '', '', '', this.identity.sub);
  }

  ngOnInit(): void {
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
    this.onEstado();
    this._usuarioService
      .showUsuarios(this.token, this.usuario)
      .subscribe((res: any) => {
        this.data = res.usuarios;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        console.log(this.data);
      });
  }

  onUpdate(usuario): void {
    this.identity = this._usuarioService.getIdentityUser(usuario);

    // console.log(this.identity);

    // // Rellenar el objeto usuario

    this.usuario = new Usuario(
      this.identity.id_usuario,
      2,
      this.identity.email_usuario,
      this.identity.password,
      this.identity.appat_usuario,
      this.identity.apmat_usuario,
      this.identity.tel_usuario,
      this.identity.id_tarjeta,
      this.identity.nombre_usuario,
      this.identity.image
    );

    // return usuario;
  }
  onDelete(usuario) {
    this.identity = this._usuarioService.getIdentityUser(usuario);

    this.usuario = new Usuario(
      this.identity.id_usuario,
      2,
      this.identity.email_usuario,
      '',
      this.identity.appat_usuario,
      this.identity.apmat_usuario,
      this.identity.tel_usuario,
      this.identity.id_tarjeta,
      this.identity.nombre_usuario,
      this.identity.image
    );
  }
  onEstado() {
    this._direccionServicio.getEstado().subscribe(
      (res: any) => {
        console.log(res);

        this.dataEstado = res.response.estado;
        // Calling the DT trigger to manually render the table

        console.log('que hay en data?  ' + this.dataEstado);
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(['/usuarios']);
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

        console.log('que hay en dataMunicipio?  ' + this.dataMunicipio);
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(['/usuarios']);
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

        console.log('que hay en dataCp?  ' + this.dataCp);
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(['/usuarios']);
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

        console.log('que hay en dataColonia?  ' + this.dataColonia);
      },
      (error) => {
        console.log('entra al error? ');

        console.log(<any>error);
        this._router.navigate(['/usuarios']);
      }
    );
  }

  onSubmit(form) {
    console.log('ésto hay en form ' + form);
    this.usuario = new Usuario(
      form.value.id,
      2,
      form.value.correo,
      this.identity.password,
      form.value.appat,
      form.value.apmat,
      form.value.telefono,
      this.identity.id_tarjeta,
      form.value.nombre,
      form.value.fileUpload1
    );

    this._usuarioService.updateByUser(this.usuario).subscribe(
      (response) => {
        console.log('Response Update ' + response);
        console.log('Response Update JSON' + JSON.stringify(response));
        this.identity = this.usuario;
        // localStorage.setItem('identity', JSON.stringify(this.identity));

        Swal.fire({
          title: 'Exito!',
          text: 'Usuario acualizado correctamene',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this._router.navigate(['/usuarios']);
      },
      (error) => {
        console.log(<any>error);
        this.status = 'error';
        Swal.fire({
          title: 'Error!',
          text: 'Error al actualizar el Usuario',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  onSubmitRegistro(form) {
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

  avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    console.log('esto hay en datos ' + JSON.stringify(datos.response));
    // console.log('esto hay en data ' + JSON.parse(data.image));
    this.usuario.image = data.image;
    console.log(this.usuario.image);
  }

  onSubmitDelete(form) {
    // console.log(form.value.id);
    // sacar el id del usuario
    let id = +form.value.id;
    console.log(id);

    //peditcion ajax al servicio para sacar los datos
    this._usuarioService.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'Usuario ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/usuarios']);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Error al eliminar el Usuario',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(['/usuarios']);
      }
    );
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
