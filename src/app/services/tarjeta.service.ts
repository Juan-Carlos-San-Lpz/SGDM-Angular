import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class TarjetaService {
  public url: string;
  public identity;
  public identityTarjeta;
  public token;
  public tokenUsuario;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  getTarjeta(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/tarjeta', { headers: headers });
  }

  create(tarjeta): Observable<any> {
    let json = JSON.stringify(tarjeta);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/tarjeta/store', params, {
      headers: headers,
    });
  }

  getIdentityTarjeta(tarjeta) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityTarjeta = tarjeta;

    if (identityTarjeta && identityTarjeta != 'undefined') {
      this.identityTarjeta = identityTarjeta;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityTarjeta = null;
    }
    return this.identityTarjeta;
  }

  updateByTarjeta(tarjeta): Observable<any> {
    let json = JSON.stringify(tarjeta);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/tarjeta/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/tarjeta/delete/' + id, {
      headers: headers,
    });
  }
}
