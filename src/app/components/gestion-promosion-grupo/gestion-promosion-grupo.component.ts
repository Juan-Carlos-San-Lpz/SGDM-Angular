import { GrupoService } from './../../services/grupo.service';
import { PromosionGrupo } from './../../models/promosionGrupo';
import { PromosionGrupoService } from './../../services/promosionGrupo.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-promosion-grupo',
  templateUrl: './gestion-promosion-grupo.component.html',
  styleUrls: ['./gestion-promosion-grupo.component.css'],
  providers: [PromosionGrupoService, GrupoService],
})
export class GestionPromosionGrupoComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public promosionGrupo: PromosionGrupo;
  public status: string;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  dataGrupo: any;
  public url: string;
  closeResult = '';

  constructor(
    private _promosionGrupoServicio: PromosionGrupoService,
    private _grupoService: GrupoService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Genero musical';

    this.promosionGrupo = new PromosionGrupo(null, 1, 1, '');
  }

  ngOnInit(): void {
    this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      order: [0, 'asc'],
      processing: true,
      autoFill: true,
      keys: true,
      info: true,
      colReorder: true,
      autoWidth: true,
      lengthChange: true,
      buttons: ['copy', 'excel', 'csv', 'pdf', 'colvis'],
      dom: 'Blfrtip',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json',
      },
      responsive: true,
      rowReorder: {
        dataSrc: 'race.order',
      },
    };
    this._promosionGrupoServicio.getPromosionGrupo().subscribe((res: any) => {
      console.log(res);

      this.data = res.promosionGrupo;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.data);
    });
    this.grupoMusica();
  }
  grupoMusica() {
    this._grupoService.getGrupos().subscribe((res: any) => {
      console.log(res);

      this.dataGrupo = res.grupos;

      console.log('que hay en dataUsuario?  ' + this.dataGrupo);
    });
  }

  onSubmit(form) {
    console.log(this.promosionGrupo);

    this._promosionGrupoServicio.create(this.promosionGrupo).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          console.log('esto hay en el response ' + response);

          this.promosionGrupo = response.statusPedido;
          this.status = 'success';
          this._router.navigate(['/promosion/grupo']);
          Swal.fire({
            title: 'Exito!',
            text: 'Permiso registrado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(<any>error);
        Swal.fire({
          title: 'Error!',
          text: 'Error al registrar Permiso',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  onData(promosionGrupo): void {
    this.identity = this._promosionGrupoServicio.getIdentityPromosionGrupo(
      promosionGrupo
    );

    console.log(
      'este es lo que tiene identity' + JSON.stringify(this.identity)
    );

    // // Rellenar el objeto usuario

    this.promosionGrupo = new PromosionGrupo(
      this.identity.id_promosion_grupo,
      this.identity.id_grupo_musica,
      this.identity.horas_previas,
      this.identity.descuento
    );
  }

  onSubmitUpdate(form) {
    console.log('ésto hay en form ' + JSON.stringify(form.value));
    this.promosionGrupo = new PromosionGrupo(
      form.value.id,
      form.value.idGrup,
      form.value.hrsPrev,
      form.value.desc
    );

    console.log(this.identity);

    this._promosionGrupoServicio
      .updateByPromosionGrupo(this.promosionGrupo)
      .subscribe(
        (response) => {
          console.log('Response Update ' + response);
          console.log('Response Update JSON' + JSON.stringify(response));
          this.identity = this.promosionGrupo;
          // localStorage.setItem('identity', JSON.stringify(this.identity));

          Swal.fire({
            title: 'Exito!',
            text: 'El Menu acualizado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/promosion/grupo']);
        },
        (error) => {
          console.log(<any>error);
          this.status = 'error';
          Swal.fire({
            title: 'Error!',
            text: 'Error al actualizar el Menu',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
  }

  onSubmitDelete(form) {
    console.log('este es el id ara eliminar ' + form.value.id);
    // sacar el id del usuario
    let id = +form.value.id;
    console.log(id);

    //peditcion ajax al servicio para sacar los datos
    this._promosionGrupoServicio.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'El Menu ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/promosion/grupo']);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Error al eliminar el Menu',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(['/promosion/grupo']);
      }
    );
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
