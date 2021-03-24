import { Router, ActivatedRoute, Params } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { Component, OnInit } from '@angular/core';
import { global } from './../../services/global';




@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[GrupoService]
})
export class HomeComponent implements OnInit {

  public grupos;
  public url;

  public page_title: string;

  constructor(
    private _grupoService: GrupoService

  ) {

    this.page_title = 'Pagina de inicio';
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getGrupos();
  }

  getGrupos(){
    this._grupoService.getGrupos().subscribe(
      response=>{
      if(response.status == 'success'){
          this.grupos =  response.grupos;
          console.log(response);
          console.log(this.grupos);
          // console.log('esto es el response '+JSON.stringify(response.grupos.nombre_genero) );
        }

      },
      error=>{
        console.log(error);
      }
    );
  }




}
