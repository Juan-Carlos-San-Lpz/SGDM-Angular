import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class SubMenuService {
  public url: string;
  public identity;
  public identitySubMenu;
  public token;
  public tokenUsuario;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  getSubMenu(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/submenu', { headers: headers });
  }

  create(submenu): Observable<any> {
    let json = JSON.stringify(submenu);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/submenu/store', params, {
      headers: headers,
    });
  }

  getIdentitySubMenu(submenu) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identitySubMenu = submenu;

    if (identitySubMenu && identitySubMenu != 'undefined') {
      this.identitySubMenu = identitySubMenu;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identitySubMenu = null;
    }
    return this.identitySubMenu;
  }

  updateBySubMenu(submenu): Observable<any> {
    let json = JSON.stringify(submenu);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/submenu/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/submenu/delete/' + id, {
      headers: headers,
    });
  }
}
