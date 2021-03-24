// import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class PromosionGrupoService {
  public url: string;
  public identity;
  public identityPromosionGrupo;
  public token;
  public tokenUsuario;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  getPromosionGrupo(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/promosion/grupo', {
      headers: headers,
    });
  }

  create(promosionGrupo): Observable<any> {
    let json = JSON.stringify(promosionGrupo);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/promosion/grupo/store', params, {
      headers: headers,
    });
  }

  getIdentityPromosionGrupo(promosionGrupo) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityPromosionGrupo = promosionGrupo;

    if (identityPromosionGrupo && identityPromosionGrupo != 'undefined') {
      this.identityPromosionGrupo = identityPromosionGrupo;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityPromosionGrupo = null;
    }
    return this.identityPromosionGrupo;
  }

  updateByPromosionGrupo(promosionGrupo): Observable<any> {
    let json = JSON.stringify(promosionGrupo);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/promosion/grupo/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/promosion/grupo/delete/' + id, {
      headers: headers,
    });
  }
}
