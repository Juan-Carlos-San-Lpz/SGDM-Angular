import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { global } from './../../services/global';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UsuarioService]
})
export class MenuComponent implements OnInit,DoCheck {

  public identity;
  public token;
  public url;

  constructor(
    public _usuarioService: UsuarioService
  ) {
      this.loadUsuario();
      this.url = global.url;
  }

  ngOnInit(){
    console.log("Web App cargada correctamente");

  }
  ngDoCheck(){
    this.loadUsuario();
  }

  loadUsuario(){
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
  }


}
