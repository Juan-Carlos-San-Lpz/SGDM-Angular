import { global } from './../../services/global';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  providers:[UsuarioService]
})
export class EditarUsuarioComponent implements OnInit {

  public page_title: string;
  public usuario:Usuario;
  public token;
  public identity;
  public status;
  public url;
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'/usuario/upload',
      method:"POST",
      headers: {
     "Authorization" : this._usuarioService.getToken()
      },
      params: {
        'page': '1'
      },
    responseType: 'json',
      },
      theme: "attachPin",
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
        sizeLimit: 'Tamaño máx.'
      }
};

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.page_title = 'Detalle usuario';
    this.usuario = new Usuario(null,2,'','','','',1,1,'','');
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
  this.url = global.url;
    // Rellenar el objeto usuario

    this.usuario = new Usuario(
      this.identity.sub,
      2,
      this.identity.email_usuario,
      '',
      this.identity.appat_usuario,
      this.identity.apmat_usuario,
      this.identity.tel_usuario,
      this.identity.id_tarjeta,
      this.identity.nombre_usuario,
      this.identity.image);

  }

  ngOnInit(): void {
  }

  onSubmit(form){

    this._usuarioService.update(this.token, this.usuario).subscribe(
      response =>{

        if(response && response.status){

          this.status = 'success';

          if(response.changes.nombre_usuario){
            this.usuario.nombre_usuario = response.changes.nombre_usuario;
          }
          if(response.changes.appat_usuario){
            this.usuario.appat_usuario = response.changes.appat_usuario;
          }
          if(response.changes.apmat_usuario){
            this.usuario.apmat_usuario = response.changes.apmat_usuario;
          }
          if(response.changes.tel_usuario){
            this.usuario.tel_usuario = response.changes.tel_usuario;
          }
          if(response.changes.email_usuario){
            this.usuario.email_usuario = response.changes.email_usuario;
          }
          if(response.changes.image){
            this.usuario.image = response.changes.image;
          }
                    console.log(response);
          console.log(this.identity.image);
          this.identity = this.usuario;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
        console.log(<any>error);

      }
    );
  }

  avatarUpload(datos){
    console.log(JSON.parse(datos.response));
    let data = JSON.parse(datos.response);

    console.log(this.usuario.image);
    console.log(data.image);

    this.usuario.image = data.image;

  }

}
