import { GeneroGrupo } from './../../models/generoGrupo';
import { GeneroService } from './../../services/genero.service';
import { GrupoMusica } from './../../models/grupoMusica';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'registro-grupo',
  templateUrl: './registro-grupo.component.html',
  styleUrls: ['./registro-grupo.component.css'],
  providers: [GrupoService, UsuarioService, GeneroService],
})
export class RegistroGrupoComponent implements OnInit {
  dtOptions: any = {};

  dtTrigger = new Subject<any>();
  data: any;
  public page_title: string;
  public grupo: GrupoMusica;
  public url: string;
  public token;
  closeResult = '';
  public identity;
  public status;
  dataGenero: any;
  public genero: GeneroGrupo;

  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.gif,.jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + '/grupo/upload',
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
    private _grupoService: GrupoService,
    private _usuarioService: UsuarioService,
    private _generoGrupoServicio: GeneroService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router
  ) {
    this.page_title = 'Registrate';
    this.grupo = new GrupoMusica(null, '', 1, 1, '', 1, '', '', 1);
    this.token = _usuarioService.getToken();
    this.url = global.url;
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
    this._grupoService.getGrupos().subscribe((res: any) => {
      console.log(res);

      this.data = res.grupos;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.data);
    });
    this.generoGrupo();
  }
  generoGrupo() {
    this._generoGrupoServicio.getGeneros().subscribe((res: any) => {
      console.log(res);

      this.dataGenero = res.generos;

      console.log('que hay en dataGenero?  ' + this.dataGenero);
    });
  }

  onUpdate(grupo): void {
    this.identity = this._grupoService.getIdentityGrupo(grupo);

    // console.log('este es el id grupo ' + this.identity.id_grupo_musica);

    // // Rellenar el objeto usuario

    this.grupo = new GrupoMusica(
      this.identity.id_grupo_musica,
      this.identity.nombre_grupo_musica,
      this.identity.no_integrantes,
      this.identity.id_genero_grupo,
      this.identity.historia_grupo,
      this.identity.precio_grupo,
      this.identity.imagen_grupo,
      this.identity.video_grupo,
      this.identity.id_usuario
    );
  }
  onDelete(grupo) {
    this.identity = this._grupoService.getIdentityGrupo(grupo);

    // console.log('este es el id grupo ' + this.identity.id_grupo_musica);

    // // Rellenar el objeto usuario

    this.grupo = new GrupoMusica(
      this.identity.id_grupo_musica,
      this.identity.nombre_grupo_musica,
      this.identity.no_integrantes,
      this.identity.id_genero_grupo,
      this.identity.historia_grupo,
      this.identity.precio_grupo,
      this.identity.imagen_grupo,
      this.identity.video_grupo,
      this.identity.id_usuario
    );
  }

  onSubmitUpdate(form) {
    console.log('ésto hay en form ' + JSON.stringify(form.value));
    this.grupo = new GrupoMusica(
      form.value.id,
      form.value.nombreGrupo,
      form.value.noIntegrantes,
      form.value.generoGrup,
      form.value.historia,
      form.value.precio,
      form.value.fileUpload1,
      this.identity.video_grupo,
      this.identity.id_usuario
    );

    // console.log(this.identity);

    this._grupoService.updateByGrupo(this.grupo).subscribe(
      (response) => {
        console.log('Response Update ' + response);
        console.log('Response Update JSON' + JSON.stringify(response));
        this.identity = this.grupo;
        // localStorage.setItem('identity', JSON.stringify(this.identity));

        Swal.fire({
          title: 'Exito!',
          text: 'Usuario acualizado correctamene',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this._router.navigate(['/grupos']);
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

  onSubmitDelete(form) {
    // console.log(form.value.id);
    // sacar el id del usuario
    let id = +form.value.id;
    console.log(id);

    //peditcion ajax al servicio para sacar los datos
    this._grupoService.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'Usuario ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/grupos']);
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
        this._router.navigate(['/grupos']);
      }
    );
  }

  onSubmit(form) {
    console.log(this.grupo);

    this._grupoService.store(this.token, this.grupo).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.status = response.status;
          Swal.fire({
            title: 'Exito!',
            text: 'Registro del grupo fue exitoso',
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
          text: 'Lo sentimos hubo un error al registrar el grupo musical',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  CartelUpload(datos) {
    console.log('entra aqui?');

    console.log(datos.response);

    let data = JSON.parse(datos.response);

    // console.log('esto hay en data' + JSON.stringify(data.image));

    this.grupo.imagen_grupo = data.image;
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
