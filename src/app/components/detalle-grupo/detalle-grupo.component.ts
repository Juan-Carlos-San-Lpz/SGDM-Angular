import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { global } from './../../services/global';

@Component({
  selector: 'detalle-grupo',
  templateUrl: './detalle-grupo.component.html',
  styleUrls: ['./detalle-grupo.component.css'],
  providers:[GrupoService]
})
export class DetalleGrupoComponent implements OnInit {

  public grupos;
  public infoGrupo;
  public url;

  constructor(
    private _grupoService: GrupoService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.detalleGrupo();
  }

  detalleGrupo(){
    // sacar el id del grupo
    this._route.params.subscribe(params => {
      let id = +params['id'];
      console.log(id);

      //peditcion ajax al servicio para sacar los datos
      this._grupoService.detalleGrupo(id).subscribe(
        response =>{
          console.log(response);

          if(response.status == 'success'){
            this.infoGrupo = response.grupos;
            console.log(this.infoGrupo);
          }
        },
        error =>{
          console.log(<any>error);
          this._router.navigate(['/inicio']);
        }
      )
    });
  }


}
