import { SubMenuService } from './../../services/subMenu.service';
import { TipoUsuarioService } from './../../services/tipousuario.service';
import { PermisoSubMenu } from './../../models/permisosSubMenu';
import { PermisosSubMenuService } from './../../services/permisosSubMenu.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { global } from './../../services/global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gestion-permisos-sub-menu',
  templateUrl: './gestion-permisos-sub-menu.component.html',
  styleUrls: ['./gestion-permisos-sub-menu.component.css'],
  providers: [PermisosSubMenuService, TipoUsuarioService, SubMenuService],
})
export class GestionPermisosSubMenuComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public permisosSubMenu: PermisoSubMenu;
  public status: string;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  dataUsuario: any;
  dataSubMenu: any;
  public url: string;
  closeResult = '';

  constructor(
    private _permisosSubMenuServicio: PermisosSubMenuService,
    private _tipoUsuarioServicio: TipoUsuarioService,
    private _subMenuServicio: SubMenuService,
    private htt: HttpClient,
    private modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Genero musical';

    this.permisosSubMenu = new PermisoSubMenu(null, 1, 1, 1, 1);
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
    this._permisosSubMenuServicio.getPermisosSubMenu().subscribe((res: any) => {
      console.log(res);

      this.data = res.permisosSubMenu;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      console.log('que hay en data?  ' + this.data);
    });
    this.tipoUsuario();
    this.subMenu();
  }

  tipoUsuario() {
    this._tipoUsuarioServicio.getTipoUsuario().subscribe((res: any) => {
      console.log(res);

      this.dataUsuario = res.tipoUsuario;

      console.log('que hay en dataUsuario?  ' + this.dataUsuario);
    });
  }

  subMenu() {
    this._subMenuServicio.getSubMenu().subscribe((res: any) => {
      console.log(res);

      this.dataSubMenu = res.SubMenu;

      console.log('que hay en dataUsuario?  ' + this.dataSubMenu);
    });
  }

  onSubmit(form) {
    console.log(this.permisosSubMenu);

    this._permisosSubMenuServicio.create(this.permisosSubMenu).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          console.log('esto hay en el response ' + response);

          this.permisosSubMenu = response.permisos;
          this.status = 'success';
          this._router.navigate(['/permisos/submenu']);
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
    this.identity = this._permisosSubMenuServicio.getIdentityPermiso(permiso);

    console.log('este es el id grupo ' + JSON.stringify(this.identity));

    // // Rellenar el objeto usuario

    this.permisosSubMenu = new PermisoSubMenu(
      this.identity.id_permisos_submenu,
      this.identity.id_tipo_usuario,
      this.identity.id_submenu,
      this.identity.orden,
      this.identity.acceso
    );
  }

  onSubmitUpdate(form) {
    console.log('ésto hay en form ' + JSON.stringify(form.value));
    this.permisosSubMenu = new PermisoSubMenu(
      form.value.id,
      form.value.idUser,
      form.value.idSubMenu,
      form.value.orden,
      form.value.acceso
    );

    console.log(this.identity);

    this._permisosSubMenuServicio
      .updateByPermisoSubMenu(this.permisosSubMenu)
      .subscribe(
        (response) => {
          console.log('Response Update ' + response);
          console.log('Response Update JSON' + JSON.stringify(response));
          this.identity = this.permisosSubMenu;
          // localStorage.setItem('identity', JSON.stringify(this.identity));

          Swal.fire({
            title: 'Exito!',
            text: 'El Menu acualizado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/permisos/submenu']);
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
    this._permisosSubMenuServicio.destroy(id).subscribe(
      (response) => {
        console.log(response);

        if (response.status == 'success') {
          Swal.fire({
            title: 'Exito!',
            text: 'El Menu ha sido eliminado correctamene',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this._router.navigate(['/permisos/submenu']);
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
        this._router.navigate(['/permisos/submenu']);
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
