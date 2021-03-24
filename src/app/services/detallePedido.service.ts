// import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class DetallePedidoService {
  public url: string;
  public identity;
  public identityDetallePermiso;
  public token;
  public tokenUsuario;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  getDetallePedido(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/detalle/pedido', { headers: headers });
  }

  create(detallePedido): Observable<any> {
    let json = JSON.stringify(detallePedido);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/detalle/pedido/store', params, {
      headers: headers,
    });
  }

  getIdentityPermiso(detallePedido) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityDetallePermiso = detallePedido;

    if (identityDetallePermiso && identityDetallePermiso != 'undefined') {
      this.identityDetallePermiso = identityDetallePermiso;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityDetallePermiso = null;
    }
    return this.identityDetallePermiso;
  }

  updateByDetallePedido(detallePedido): Observable<any> {
    let json = JSON.stringify(detallePedido);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/detalle/pedido/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/detalle/pedido/delete/' + id, {
      headers: headers,
    });
  }
}
