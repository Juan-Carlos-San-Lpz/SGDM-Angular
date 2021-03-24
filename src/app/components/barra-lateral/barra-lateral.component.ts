import { MenuService } from './../../services/menu.servirce';
import { GeneroService } from './../../services/genero.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from './../../services/global';

@Component({
  selector: 'barralateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css'],
  providers: [UsuarioService, GeneroService, MenuService],
})
export class BarraLateralComponent implements OnInit {
  public identity;
  public token;
  public url;
  public generos;
  public menu;

  constructor(
    private _usuarioService: UsuarioService,
    private _generoServicio: GeneroService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _menuService: MenuService
  ) {
    this.identity = this._usuarioService.getIdentity();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getGeneros();
    this.ShowMenuByUser();
  }

  getGeneros() {
    // console.log('entra a generos?');

    this._generoServicio.getGeneros().subscribe(
      (response) => {
        if (response.status == 'success') {
          this.generos = response.generos;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ShowMenuByUser() {
    // sacar el id_tipo_usuario del grupo

    let idIdentity = localStorage.getItem('identity');
    let id_tipo_usuario = JSON.parse(idIdentity).id_tipo_usuario;
    console.log('aquie debe de estar mi id_tipo_usuario ' + id_tipo_usuario);

    //peditcion ajax al servicio para sacar los datos
    this._menuService.showMenuByUser(id_tipo_usuario).subscribe(
      (response) => {
        // console.log('que hay en el response? '+ JSON.stringify(response));

        if (response.status == 'success') {
          this.menu = response.Menu;
          // console.log('que hay a qui ? ' +this.menu);
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(['/inicio']);
      }
    );
  }
}
