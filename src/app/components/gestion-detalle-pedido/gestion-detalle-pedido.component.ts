import { GrupoService } from './../../services/grupo.service';
import { PedidoService } from './../../services/pedido.service';
import { DetallePedidoService } from './../../services/detallePedido.service';
import { DetallePedido } from './../../models/detallePedido';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-detalle-pedido',
  templateUrl: './gestion-detalle-pedido.component.html',
  styleUrls: ['./gestion-detalle-pedido.component.css'],
  providers: [DetallePedidoService, PedidoService, GrupoService],
})
export class GestionDetallePedidoComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public detallePedido: DetallePedido;
  public status: string;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  dataPedido: any;
  dataGrupo: any;
  public url: string;
  closeResult = '';

  constructor(
    private _detallePedidoServicio: DetallePedidoService,
    private _pedidoServicio: PedidoService,
    private _grupoService: GrupoService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Genero musical';

    this.detallePedido = new DetallePedido(null, 1, 1, '', '');
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
    this._detallePedidoServicio.getDetallePedido().subscribe((res: any) => {
      console.log(res);

      this.data = res.detallePedido;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.data);
    });
    this.pedido();
    this.grupoMusica();
  }
  pedido() {
    this._pedidoServicio.getPedido().subscribe((res: any) => {
      console.log(res);

      this.dataPedido = res.pedido;

      console.log('que hay en dataUsuario?  ' + this.dataPedido);
    });
  }
  grupoMusica() {
    this._grupoService.getGrupos().subscribe((res: any) => {
      console.log(res);

      this.dataGrupo = res.grupos;

      console.log('que hay en dataUsuario?  ' + this.dataGrupo);
    });
  }

  onSubmit(form) {
    console.log(this.detallePedido);

    this._detallePedidoServicio.create(this.detallePedido).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          console.log('esto hay en el response ' + response);

          this.detallePedido = response.permisos;
          this.status = 'success';
          this._router.navigate(['/detalle/pedido']);
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

  onData(detallePedido): void {
    this.identity = this._detallePedidoServicio.getIdentityPermiso(
      detallePedido
    );

    console.log(
      'este es lo que tiene identity' + JSON.stringify(this.identity)
    );

    // // Rellenar el objeto usuario

    this.detallePedido = new DetallePedido(
      this.identity.id_detalle_pedido,
      this.identity.id_pedido,
      this.identity.id_grupo_musica,
      this.identity.precio_total,
      this.identity.fecha_evento
    );
  }

  onSubmitUpdate(form) {
    console.log('ésto hay en form ' + JSON.stringify(form.value));
    this.detallePedido = new DetallePedido(
      form.value.id,
      form.value.idPedido,
      form.value.idgrup,
      form.value.precioTotal,
      form.value.fechaEven
    );

    console.log(this.identity);

    this._detallePedidoServicio
      .updateByDetallePedido(this.detallePedido)
      .subscribe(
        (response) => {
          console.log('Response Update ' + response);
          console.log('Response Update JSON' + JSON.stringify(response));
          this.identity = this.detallePedido;
          // localStorage.setItem('identity', JSON.stringify(this.identity));

          Swal.fire({
            title: 'Exito!',
            text: 'El Menu acualizado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/detalle/pedido']);
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
    this._detallePedidoServicio.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'El Menu ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/detalle/pedido']);
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
        this._router.navigate(['/detalle/pedido']);
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
