// import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class MenuService {
  public url: string;
  public identity;
  public identityMenu;
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

  getMenus(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.get(this.url + '/menu', { headers: headers });
  }

  create(token, menu): Observable<any> {
    let json = JSON.stringify(menu);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.post(this.url + '/menu/store', params, {
      headers: headers,
    });
  }

  getIdentityMenu(menu) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityMenu = menu;

    if (identityMenu && identityMenu != 'undefined') {
      this.identityMenu = identityMenu;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityMenu = null;
    }
    return this.identityMenu;
  }

  updateByMenu(menu): Observable<any> {
    let json = JSON.stringify(menu);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/menu/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/menu/delete/' + id, {
      headers: headers,
    });
  }
}
