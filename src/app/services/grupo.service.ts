import { GrupoMusica } from './../models/grupoMusica';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class GrupoService {
  public url: string;
  public identity;
  public identityGrupo;
  public token;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  test() {
    return 'Hola desde un servicio';
  }

  store(token, GrupoMusica): Observable<any> {
    let json = JSON.stringify(GrupoMusica);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + '/grupo/store', params, {
      headers: headers,
    });
  }

  getGrupos(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + '/grupo', { headers: headers });
  }

  detalleGrupo(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + '/detalle/grupo/' + id, {
      headers: headers,
    });
  }

  getIdentityGrupo(grupo) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityGrupo = grupo;

    if (identityGrupo && identityGrupo != 'undefined') {
      this.identityGrupo = identityGrupo;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityGrupo = null;
    }
    return this.identityGrupo;
  }

  updateByGrupo(grupo): Observable<any> {
    let json = JSON.stringify(grupo);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/grupo/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.delete(this.url + '/grupo/delete/' + id, {
      headers: headers,
    });
  }
}
