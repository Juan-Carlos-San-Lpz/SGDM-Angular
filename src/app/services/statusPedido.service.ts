// import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class StatusPedidoService {
  public url: string;
  public identity;
  public identityStatusPermiso;
  public token;
  public tokenUsuario;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  getStatusPedido(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/status/pedido', { headers: headers });
  }

  create(menu): Observable<any> {
    let json = JSON.stringify(menu);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/status/pedido/store', params, {
      headers: headers,
    });
  }

  getIdentityStatusPermiso(statusPedido) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityStatusPermiso = statusPedido;

    if (identityStatusPermiso && identityStatusPermiso != 'undefined') {
      this.identityStatusPermiso = identityStatusPermiso;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityStatusPermiso = null;
    }
    return this.identityStatusPermiso;
  }

  updateByStatusPedido(statusPedido): Observable<any> {
    let json = JSON.stringify(statusPedido);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/status/pedido/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/status/pedido/delete/' + id, {
      headers: headers,
    });
  }
}
