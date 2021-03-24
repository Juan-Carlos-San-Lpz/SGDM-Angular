import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from './../../models/usuario';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public usuario:Usuario;
  public status: string;
  public token;
  public identity;

  constructor(
    private _usuarioService: UsuarioService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.page_title = 'identificate';
    this.usuario = new Usuario(null,2,'','','','',1,1,'','');
  }

  ngOnInit(): void {
    // esto se ejecuta siempre y se cierra solo cuando le llega el parametro sure por la url
    this.logout();
  }

  onSubmit(form){
    console.log(form);

    this._usuarioService.signup(this.usuario).subscribe(
      response =>{
        // devuelve el token

        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;
          // Objeto usuario identificado
              this._usuarioService.signup(this.usuario,true).subscribe(
                response =>{
                    this.identity = response;
                    console.log(response);

                    // persistir los daos del usuario identificado
                    console.log(this.token);
                    console.log(this.identity);
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    // Redireccion a la pagina de inicio
                    this._router.navigate(['/inicio']);
                },
                error=>{
                  this.status = 'error';
                  console.log(<any>error);
                }
              );
        }else{
          this.status = 'error';
        }
      },
      error=>{
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout(){
    this._route.params.subscribe(params =>{
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redireccion a la pagina de inicio
        this._router.navigate(['/login']);
      }
    });
  }

}
