import { FechaPagoService } from './../../services/fechaPago.service';
import { FechaPago } from './../../models/fechaPago';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-fecho-pago',
  templateUrl: './gestion-fecho-pago.component.html',
  styleUrls: ['./gestion-fecho-pago.component.css'],
  providers: [FechaPagoService],
})
export class GestionFechoPagoComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public fechaPago: FechaPago;
  public status: string;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  public url: string;
  closeResult = '';

  constructor(
    private _fechaPagoServicio: FechaPagoService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Genero musical';

    this.fechaPago = new FechaPago(null, '');
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
    this._fechaPagoServicio.getFechaPago().subscribe((res: any) => {
      console.log(res);

      this.data = res.fechaPago;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.data);
    });
  }

  onSubmit(form) {
    console.log(this.fechaPago);

    this._fechaPagoServicio.create(this.fechaPago).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          console.log('esto hay en el response ' + response);

          this.fechaPago = response.statusPedido;
          this.status = 'success';
          this._router.navigate(['/fecha/pago']);
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
    this.identity = this._fechaPagoServicio.getIdentityTarjeta(promosionGrupo);

    console.log(
      'este es lo que tiene identity' + JSON.stringify(this.identity)
    );

    // // Rellenar el objeto usuario

    this.fechaPago = new FechaPago(
      this.identity.id_fecha_pago,
      this.identity.fecha
    );
  }

  onSubmitUpdate(form) {
    console.log('ésto hay en form ' + JSON.stringify(form.value));
    this.fechaPago = new FechaPago(form.value.id, form.value.fechPago);

    console.log(this.identity);

    this._fechaPagoServicio.updateByTarjeta(this.fechaPago).subscribe(
      (response) => {
        console.log('Response Update ' + response);
        console.log('Response Update JSON' + JSON.stringify(response));
        this.identity = this.fechaPago;
        // localStorage.setItem('identity', JSON.stringify(this.identity));

        Swal.fire({
          title: 'Exito!',
          text: 'El Menu acualizado correctamene',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this._router.navigate(['/fecha/pago']);
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
    this._fechaPagoServicio.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'El Menu ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/fecha/pago']);
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
        this._router.navigate(['/fecha/pago']);
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
