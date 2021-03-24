import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class TipoUsuarioService {
  public url: string;
  public identity;
  public identityTipoUsuario;
  public token;
  public tokenUsuario;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  getTipoUsuario(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/tipo/usuario', { headers: headers });
  }

  create(tipoUsuario): Observable<any> {
    let json = JSON.stringify(tipoUsuario);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/tipo/usuario/store', params, {
      headers: headers,
    });
  }

  getIdentityTarjeta(tipoUsuario) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityTipoUsuario = tipoUsuario;

    if (identityTipoUsuario && identityTipoUsuario != 'undefined') {
      this.identityTipoUsuario = identityTipoUsuario;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityTipoUsuario = null;
    }
    return this.identityTipoUsuario;
  }

  updateByTarjeta(tipoUsuario): Observable<any> {
    let json = JSON.stringify(tipoUsuario);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/tipo/usuario/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/tipo/usuario/delete/' + id, {
      headers: headers,
    });
  }
}
