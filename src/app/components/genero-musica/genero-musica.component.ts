import { GeneroService } from './../../services/genero.service';
import { GeneroGrupo } from './../../models/generoGrupo';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'genero-musica',
  templateUrl: './genero-musica.component.html',
  styleUrls: ['./genero-musica.component.css'],
  providers: [UsuarioService, GeneroService],
})
export class GeneroMusicaComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public genero: GeneroGrupo;
  public status: string;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  public url: string;
  closeResult = '';

  constructor(
    private _usuarioServicio: UsuarioService,
    private _generoServicio: GeneroService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Genero musical';
    this.identity = this._usuarioServicio.getIdentity();
    this.token = this._usuarioServicio.getToken();
    this.genero = new GeneroGrupo(1, '');
  }

  ngOnInit(): void {
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
    this._generoServicio.getGeneros().subscribe((res: any) => {
      console.log(res);

      this.data = res.generos;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.data);
    });
  }

  onData(genero): void {
    this.identity = this._generoServicio.getIdentityGenero(genero);

    console.log('este es el id grupo ' + JSON.stringify(this.identity));

    // // Rellenar el objeto usuario

    this.genero = new GeneroGrupo(
      this.identity.id_genero_grupo,
      this.identity.nombre_genero
    );
  }

  onSubmit(form) {
    console.log(this.genero);

    this._generoServicio.create(this.token, this.genero).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          this.genero = response.genero;
          this.status = 'success';
          this._router.navigate(['/genero-musical']);
          Swal.fire({
            title: 'Exito!',
            text: 'Genero Musical registrado correctamente',
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
          text: 'Error al registrar Genero Musical',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  onSubmitUpdate(form) {
    console.log('ésto hay en form ' + JSON.stringify(form.value));
    this.genero = new GeneroGrupo(form.value.id, form.value.nombreGenero);

    // console.log(this.identity);

    this._generoServicio.updateByGenero(this.genero).subscribe(
      (response) => {
        console.log('Response Update ' + response);
        console.log('Response Update JSON' + JSON.stringify(response));
        this.identity = this.genero;
        // localStorage.setItem('identity', JSON.stringify(this.identity));

        Swal.fire({
          title: 'Exito!',
          text: 'El genero musical acualizado correctamene',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this._router.navigate(['/genero-musical']);
      },
      (error) => {
        console.log(<any>error);
        this.status = 'error';
        Swal.fire({
          title: 'Error!',
          text: 'Error al actualizar el genero musical',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  onSubmitDelete(form) {
    // console.log(form.value.id);
    // sacar el id del usuario
    let id = +form.value.id;
    console.log(id);

    //peditcion ajax al servicio para sacar los datos
    this._generoServicio.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'El Genero musical ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/genero-musical']);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Error al eliminar el Genero Musical',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(['/genero-musical']);
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
