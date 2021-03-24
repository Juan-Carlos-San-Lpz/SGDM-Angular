import { Component, OnInit } from '@angular/core';
import { global } from './../../services/global';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from './../../models/usuario';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {

  public url;
  public identity;
  public usuario:Usuario;
  public status;
  public token;
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
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: true,
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
    public _usuarioService: UsuarioService
  )
  {
    this.identity = this._usuarioService.getIdentity();
    this.url = global.url;
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



  }

}
