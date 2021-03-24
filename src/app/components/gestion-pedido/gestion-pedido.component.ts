import { FechaPagoService } from './../../services/fechaPago.service';
import { StatusPedido } from './../../models/statusPedido';
import { StatusPedidoService } from './../../services/statusPedido.service';
import { UsuarioService } from './../../services/usuario.service';
import { Pedido } from './../../models/pedido';
import { PedidoService } from './../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-pedido',
  templateUrl: './gestion-pedido.component.html',
  styleUrls: ['./gestion-pedido.component.css'],
  providers: [
    PedidoService,
    UsuarioService,
    StatusPedidoService,
    FechaPagoService,
  ],
})
export class GestionPedidoComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public pedido: Pedido;
  public status: string;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  dataUsuario: any;
  dataStatus: any;
  dataFechaPago: any;
  public url: string;
  closeResult = '';
  public statusPedido: StatusPedido;

  constructor(
    private _pedidoServicio: PedidoService,
    private _usuarioService: UsuarioService,
    private _statusPedidoServicio: StatusPedidoService,
    private _fechaPagoServicio: FechaPagoService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Genero musical';

    this.pedido = new Pedido(null, 1, '', '', 1, 1, '');
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
    this._pedidoServicio.getPedido().subscribe((res: any) => {
      console.log(res);

      this.data = res.pedido;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.data);
    });
    this.usuario();
    this.Status();
    this.fechaPago();
  }
  usuario() {
    this._usuarioService
      .showUsuarios(this.token, this.usuario)
      .subscribe((res: any) => {
        this.dataUsuario = res.usuarios;

        console.log(this.dataUsuario);
      });
  }
  Status() {
    this._statusPedidoServicio.getStatusPedido().subscribe((res: any) => {
      console.log(res);

      this.dataStatus = res.statusPedido;

      console.log(this.dataStatus);
    });
  }
  fechaPago() {
    this._fechaPagoServicio.getFechaPago().subscribe((res: any) => {
      console.log(res);

      this.dataFechaPago = res.fechaPago;

      console.log(this.dataFechaPago);
    });
  }

  onSubmit(form) {
    console.log(this.pedido);

    this._pedidoServicio.create(this.pedido).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          console.log('esto hay en el response ' + response);

          this.pedido = response.permisos;
          this.status = 'success';
          this._router.navigate(['/pedido']);
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

  onData(permiso): void {
    this.identity = this._pedidoServicio.getIdentityPermiso(permiso);

    console.log(
      'este es lo que tiene identity' + JSON.stringify(this.identity)
    );

    // // Rellenar el objeto usuario

    this.pedido = new Pedido(
      this.identity.id_pedido,
      this.identity.id_usuario,
      this.identity.fecha_registro,
      this.identity.fecha_expiracion,
      this.identity.id_fecha_pago,
      this.identity.id_status_pedido,
      this.identity.total
    );
  }

  onSubmitUpdate(form) {
    console.log('ésto hay en form ' + JSON.stringify(form.value));
    this.pedido = new Pedido(
      form.value.id,
      form.value.idUser,
      form.value.fechaReg,
      form.value.fechaExp,
      form.value.fechaPago,
      form.value.status,
      form.value.total
    );

    console.log(this.identity);

    this._pedidoServicio.updateByPedido(this.pedido).subscribe(
      (response) => {
        console.log('Response Update ' + response);
        console.log('Response Update JSON' + JSON.stringify(response));
        this.identity = this.pedido;
        // localStorage.setItem('identity', JSON.stringify(this.identity));

        Swal.fire({
          title: 'Exito!',
          text: 'El Menu acualizado correctamene',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this._router.navigate(['/pedido']);
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
    this._pedidoServicio.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'El Menu ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/pedido']);
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
        this._router.navigate(['/pedido']);
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
