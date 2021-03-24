import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { MenuComponent } from './components/menu/menu.component';
import { DataTableUsuariosComponent } from './components/data-table-usuarios/data-table-usuarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DetalleGrupoComponent } from './components/detalle-grupo/detalle-grupo.component';
import { RegistroGrupoComponent } from './components/registro-grupo/registro-grupo.component';
import { GeneroMusicaComponent } from './components/genero-musica/genero-musica.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { CartComponent } from './components/cart/cart.component';
import { GestionMenuComponent } from './components/gestion-menu/gestion-menu.component';
import { PruebaDireccionComponent } from './components/prueba-direccion/prueba-direccion.component';
import { GestionPermisosComponent } from './components/gestion-permisos/gestion-permisos.component';
import { GestionSubMenuComponent } from './components/gestion-sub-menu/gestion-sub-menu.component';
import { GestionPermisosSubMenuComponent } from './components/gestion-permisos-sub-menu/gestion-permisos-sub-menu.component';
import { GestionPedidoComponent } from './components/gestion-pedido/gestion-pedido.component';
import { GestionDetallePedidoComponent } from './components/gestion-detalle-pedido/gestion-detalle-pedido.component';
import { GestionStatusPedidoComponent } from './components/gestion-status-pedido/gestion-status-pedido.component';
import { GestionPromosionGrupoComponent } from './components/gestion-promosion-grupo/gestion-promosion-grupo.component';
import { GestionTarjetaComponent } from './components/gestion-tarjeta/gestion-tarjeta.component';
import { GestionTipoUsuarioComponent } from './components/gestion-tipo-usuario/gestion-tipo-usuario.component';
import { GestionFechoPagoComponent } from './components/gestion-fecho-pago/gestion-fecho-pago.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    ErrorComponent,
    BarraLateralComponent,
    MenuComponent,
    DataTableUsuariosComponent,
    PerfilComponent,
    EditarUsuarioComponent,
    UsuariosComponent,
    DetalleGrupoComponent,
    RegistroGrupoComponent,
    GeneroMusicaComponent,
    PruebaComponent,
    CartComponent,
    GestionMenuComponent,
    PruebaDireccionComponent,
    GestionPermisosComponent,
    GestionSubMenuComponent,
    GestionPermisosSubMenuComponent,
    GestionPedidoComponent,
    GestionDetallePedidoComponent,
    GestionStatusPedidoComponent,
    GestionPromosionGrupoComponent,
    GestionTarjetaComponent,
    GestionTipoUsuarioComponent,
    GestionFechoPagoComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    AngularFileUploaderModule,
    NgbModule,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
