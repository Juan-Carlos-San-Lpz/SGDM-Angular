// import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class PedidoService {
  public url: string;
  public identity;
  public identityPermiso;
  public token;
  public tokenUsuario;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  showMenuByUser(id_tipo_usuario): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/menu/user/' + id_tipo_usuario, {
      headers: headers,
    });
  }

  getPedido(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/pedido', { headers: headers });
  }

  create(menu): Observable<any> {
    let json = JSON.stringify(menu);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/pedido/store', params, {
      headers: headers,
    });
  }

  getIdentityPermiso(permiso) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityPermiso = permiso;

    if (identityPermiso && identityPermiso != 'undefined') {
      this.identityPermiso = identityPermiso;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityPermiso = null;
    }
    return this.identityPermiso;
  }

  updateByPedido(pedido): Observable<any> {
    let json = JSON.stringify(pedido);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/pedido/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/pedido/delete/' + id, {
      headers: headers,
    });
  }
}
