import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class GeneroService {
  public url: string;
  public identity;
  public identityGenero;
  public token;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  create(token, genero): Observable<any> {
    let json = JSON.stringify(genero);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.post(this.url + '/genero', params, { headers: headers });
  }

  getIdentityGenero(genero) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityGenero = genero;

    if (identityGenero && identityGenero != 'undefined') {
      this.identityGenero = identityGenero;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityGenero = null;
    }
    return this.identityGenero;
  }

  updateByGenero(genero): Observable<any> {
    let json = JSON.stringify(genero);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/genero/update', params, {
      headers: headers,
    });
  }

  getGeneros(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + '/genero', { headers: headers });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/genero/delete/' + id, {
      headers: headers,
    });
  }
}
