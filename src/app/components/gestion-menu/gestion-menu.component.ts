import { UsuarioService } from 'src/app/services/usuario.service';
import { Menu } from './../../models/menu';
import { MenuService } from './../../services/menu.servirce';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'gestion-menu',
  templateUrl: './gestion-menu.component.html',
  styleUrls: ['./gestion-menu.component.css'],
  providers: [MenuService, UsuarioService],
})
export class GestionMenuComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public menu: Menu;
  public status: string;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  public url: string;
  closeResult = '';

  constructor(
    private _usuarioServicio: UsuarioService,
    private _menusServicio: MenuService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Genero musical';
    this.identity = this._usuarioServicio.getIdentity();
    this.token = this._usuarioServicio.getToken();
    this.menu = new Menu(null, '', '', '', 1);
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
    this._menusServicio.getMenus().subscribe((res: any) => {
      console.log(res);

      this.data = res.Menu;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.data);
    });
  }

  onSubmit(form) {
    console.log(this.menu);

    this._menusServicio.create(this.token, this.menu).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          this.menu = response.Menu;
          this.status = 'success';
          this._router.navigate(['/menus']);
          Swal.fire({
            title: 'Exito!',
            text: 'Menu registrado correctamente',
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
          text: 'Error al registrar Menu',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  onData(menu): void {
    this.identity = this._menusServicio.getIdentityMenu(menu);

    console.log('este es el id grupo ' + JSON.stringify(this.identity));

    // // Rellenar el objeto usuario

    this.menu = new Menu(
      this.identity.id_menu,
      this.identity.nombre_menu,
      this.identity.url_menu,
      this.identity.icono,
      this.identity.posicion_menu
    );
  }

  onSubmitUpdate(form) {
    console.log('ésto hay en form ' + JSON.stringify(form.value));
    this.menu = new Menu(
      form.value.id,
      form.value.nombreMenu,
      form.value.url,
      form.value.icono,
      form.value.posicion
    );

    // console.log(this.identity);

    this._menusServicio.updateByMenu(this.menu).subscribe(
      (response) => {
        console.log('Response Update ' + response);
        console.log('Response Update JSON' + JSON.stringify(response));
        this.identity = this.menu;
        // localStorage.setItem('identity', JSON.stringify(this.identity));

        Swal.fire({
          title: 'Exito!',
          text: 'El Menu acualizado correctamene',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this._router.navigate(['/menus']);
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
    // console.log(form.value.id);
    // sacar el id del usuario
    let id = +form.value.id;
    console.log(id);

    //peditcion ajax al servicio para sacar los datos
    this._menusServicio.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'El Menu ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/menus']);
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
        this._router.navigate(['/menus']);
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
