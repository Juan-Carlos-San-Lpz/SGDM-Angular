import { MenuService } from './../../services/menu.servirce';
import { SubMenuService } from './../../services/subMenu.service';
import { SubMenu } from './../../models/subMenu';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-sub-menu',
  templateUrl: './gestion-sub-menu.component.html',
  styleUrls: ['./gestion-sub-menu.component.css'],
  providers: [SubMenuService, MenuService],
})
export class GestionSubMenuComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public submenu: SubMenu;
  public status: string;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  dataMenu: any;
  public url: string;
  closeResult = '';

  constructor(
    private _subMenuServicio: SubMenuService,
    private _menusServicio: MenuService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Genero musical';

    this.submenu = new SubMenu(null, 1, '', '', 1);
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
    this._subMenuServicio.getSubMenu().subscribe((res: any) => {
      console.log(res);

      this.data = res.SubMenu;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.data);
    });
    this.menu();
  }
  menu() {
    this._menusServicio.getMenus().subscribe((res: any) => {
      console.log(res);

      this.dataMenu = res.Menu;

      console.log('que hay en dataUsuario?  ' + this.dataMenu);
    });
  }

  onSubmit(form) {
    console.log('esto hay  en el formulario ' + JSON.stringify(this.submenu));

    this._subMenuServicio.create(this.submenu).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          console.log('esto hay en el response ' + response);

          this.submenu = response.submenu;
          this.status = 'success';
          this._router.navigate(['/submenu']);
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

  onData(submenu): void {
    this.identity = this._subMenuServicio.getIdentitySubMenu(submenu);

    console.log('Esto esta en identity' + JSON.stringify(this.identity));

    // // Rellenar el objeto usuario

    this.submenu = new SubMenu(
      this.identity.id_submenu,
      this.identity.id_menu,
      this.identity.nombre_submenu,
      this.identity.url_submenu,
      this.identity.posicion_submenu
    );
  }

  onSubmitUpdate(form) {
    console.log('ésto hay en form ' + JSON.stringify(form.value));
    this.submenu = new SubMenu(
      form.value.id,
      form.value.idMenu,
      form.value.nombreSubMenu,
      form.value.url,
      form.value.posicion
    );

    console.log(this.identity);

    this._subMenuServicio.updateBySubMenu(this.submenu).subscribe(
      (response) => {
        console.log('Response Update ' + response);
        console.log('Response Update JSON' + JSON.stringify(response));
        this.identity = this.submenu;
        // localStorage.setItem('identity', JSON.stringify(this.identity));

        Swal.fire({
          title: 'Exito!',
          text: 'El Menu acualizado correctamene',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this._router.navigate(['/submenu']);
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
    this._subMenuServicio.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'El Menu ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/submenu']);
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
        this._router.navigate(['/submenu']);
        Swal.fire({
          title: 'Error!',
          text: 'Error al eliminar el Menu',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
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
