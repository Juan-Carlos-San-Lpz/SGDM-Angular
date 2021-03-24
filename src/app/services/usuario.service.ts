// import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class UsuarioService {
  public url: string;
  public identity;
  public identityUsuario;
  public token;
  public tokenUsuario;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  test() {
    return 'Hola desde un servicio';
  }

  registro(Usuario): Observable<any> {
    let json = JSON.stringify(Usuario);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + '/usuario/registro', params, {
      headers: headers,
    });
    // console.log(this.url+'usuario/registro');
  }

  signup(Usuario, gettoken = null): Observable<any> {
    if (gettoken != null) {
      Usuario.gettoken = 'true';
    }
    let json = JSON.stringify(Usuario);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/usuario/login', params, {
      headers: headers,
    });
  }

  update(Token, Usuario): Observable<any> {
    let json = JSON.stringify(Usuario);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/usuario/update', params, {
      headers: headers,
    });
  }
  getIdentityUser(usuario) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityUsuario = usuario;

    if (identityUsuario && identityUsuario != 'undefined') {
      this.identityUsuario = identityUsuario;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityUsuario = null;
    }
    return this.identityUsuario;
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity && identity != 'undefined') {
      this.identity = identity;
      // console.log("identity" + identity);
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getTokenUser(usuario) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    let tokenUsuario = usuario;

    if (tokenUsuario && tokenUsuario != 'undefined') {
      this.tokenUsuario = tokenUsuario;
      // console.log("Token GetTokenUsuario  ,,"+ tokenUsuario);
    } else {
      this.tokenUsuario = null;
    }
    return this.tokenUsuario;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
      // console.log("token gettken " + token);
    } else {
      this.token = null;
    }
    return this.token;
  }

  showUsuarios(token, Usuario): Observable<any> {
    let json = JSON.stringify(Usuario);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/usuarios', params, {
      headers: headers,
    });
  }

  updateByUser(usuario): Observable<any> {
    let json = JSON.stringify(usuario);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/usuario/updateByUser', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.delete(this.url + '/usuario/delete/' + id, {
      headers: headers,
    });
  }
}
