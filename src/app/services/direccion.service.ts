import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class DireccionService {
  public url: string;
  public identity;
  public identityfechaPago;
  public token;
  public tokenUsuario;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  getEstado(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post('https://api-sepomex.hckdrk.mx/query/get_estados', {
      headers: headers,
    });
  }
  getMunicipio(estado): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(
      'https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/' + estado,
      {
        headers: headers,
      }
    );
  }

  getCp(municipio): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(
      'https://api-sepomex.hckdrk.mx/query/get_cp_por_municipio/' + municipio,
      {
        headers: headers,
      }
    );
  }

  getColonia(cp): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(
      'https://api-sepomex.hckdrk.mx/query/get_colonia_por_cp/' + cp,
      {
        headers: headers,
      }
    );
  }

  create(direccion): Observable<any> {
    let json = JSON.stringify(direccion);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/dirreccion/store', params, {
      headers: headers,
    });
  }

  getIdentityTarjeta(fechaPago) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityfechaPago = fechaPago;

    if (identityfechaPago && identityfechaPago != 'undefined') {
      this.identityfechaPago = identityfechaPago;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityfechaPago = null;
    }
    return this.identityfechaPago;
  }

  updateByTarjeta(fechaPago): Observable<any> {
    let json = JSON.stringify(fechaPago);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/fecha/pago/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/fecha/pago/delete/' + id, {
      headers: headers,
    });
  }
}
