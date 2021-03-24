// import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class PermisosSubMenuService {
  public url: string;
  public identity;
  public identityPermisoSubMenu;
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

  getPermisosSubMenu(): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/permisos/submenu', {
      headers: headers,
    });
  }

  create(permisoSubMenu): Observable<any> {
    let json = JSON.stringify(permisoSubMenu);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.post(this.url + '/permisosSubMenu/store', params, {
      headers: headers,
    });
  }

  getIdentityPermiso(permisoSubMenu) {
    // console.log("Usuario identity usuario "+usuario.id_usuario);
    // console.log("Usuario identity usuario "+usuario.nombre_usuario);

    let identityPermisoSubMenu = permisoSubMenu;

    if (identityPermisoSubMenu && identityPermisoSubMenu != 'undefined') {
      this.identityPermisoSubMenu = identityPermisoSubMenu;
      // console.log("identity usuario get identity ... "+JSON.stringify({identityUsuario}));
    } else {
      this.identityPermisoSubMenu = null;
    }
    return this.identityPermisoSubMenu;
  }

  updateByPermisoSubMenu(permisoSubMenu): Observable<any> {
    let json = JSON.stringify(permisoSubMenu);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.put(this.url + '/permisosSubMenu/update', params, {
      headers: headers,
    });
  }

  destroy(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(id);

    return this._http.delete(this.url + '/permisosSubMenu/delete/' + id, {
      headers: headers,
    });
  }
}
