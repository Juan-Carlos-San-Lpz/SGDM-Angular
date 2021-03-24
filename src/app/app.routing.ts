// iIMPORTS NECESARIOS
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORTS COMPONENTES
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { PerfilComponent } from './components/perfil/perfil.component';
// import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { DataTableUsuariosComponent } from './components/data-table-usuarios/data-table-usuarios.component';
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

// DEFINIR RUTAS
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario/detalle', component: DataTableUsuariosComponent },
  { path: 'detalle/grupo/:id', component: DetalleGrupoComponent },
  { path: 'grupos', component: RegistroGrupoComponent },
  { path: 'genero-musical', component: GeneroMusicaComponent },
  { path: 'carrito/compras', component: CartComponent },
  { path: 'menus', component: GestionMenuComponent },
  { path: 'permisos', component: GestionPermisosComponent },
  { path: 'submenu', component: GestionSubMenuComponent },
  { path: 'permisos/submenu', component: GestionPermisosSubMenuComponent },
  { path: 'pedido', component: GestionPedidoComponent },
  { path: 'detalle/pedido', component: GestionDetallePedidoComponent },
  { path: 'status/pedido', component: GestionStatusPedidoComponent },
  { path: 'promosion/grupo', component: GestionPromosionGrupoComponent },
  { path: 'tarjeta', component: GestionTarjetaComponent },
  { path: 'tipo/usuario', component: GestionTipoUsuarioComponent },
  { path: 'fecha/pago', component: GestionFechoPagoComponent },
  { path: 'prueba/direccion', component: PruebaDireccionComponent },
  { path: 'prueba', component: PruebaComponent },
  { path: '**', component: ErrorComponent }, //Siempre debe ser la ultima ruta
];
//  EXPORTAR CONFIGURACION
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes
);
