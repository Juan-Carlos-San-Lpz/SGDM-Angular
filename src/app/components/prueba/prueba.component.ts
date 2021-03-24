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

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
  providers: [UsuarioService],
})
export class PruebaComponent implements OnDestroy, OnInit {
  dtOptions: any = {};

  dtTrigger = new Subject<any>();
  data: any;

  public url: string;
  public usuario: Usuario;
  public token;
  closeResult: string;
  public identity;
  public status;

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
    private modalService: NgbModal,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      order: [0, 'desc'],
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

  onSubmit(form) {
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

    console.log('que hay en la imagen? ' + form.value.fileUpload1);

    this._usuarioService.updateByUser(this.usuario).subscribe(
      (response) => {
        console.log('Response Update ' + response);
        console.log('Response Update JSON' + JSON.stringify(response));
        // this.identity = this.usuario;
        // localStorage.setItem('identity', JSON.stringify(this.identity));
        Swal.fire({
          title: 'Exito!',
          text: 'Usuario acualizado correctamene',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this._router.navigate(['/prueba']);
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

  avatarUpload(datos) {
    let data = JSON.parse(datos.response);

    this.usuario.image = data.image;
    console.log('llega aqui?' + JSON.stringify(data.image));
  }

  onSubmitDelete(form) {}

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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
