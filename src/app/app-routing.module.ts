import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { UserDashboardComponent } from './layout/user-dashboard/user-dashboard.component';
import { CrearCitaComponent } from './components/crear-cita/crear-cita.component';
import { AccessDeniedComponent } from './features/access-denied/access-denied.component';
import { CitasPendientesComponent } from './components/citas-pendientes/citas-pendientes.component';
import { PagoComponent } from './components/pago/pago.component';
import { PagoFiltrarComponent } from './components/pago-filtrar/pago-filtrar.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { VentaComponent } from './components/venta/venta.component';

const routes: Routes = [
  { path: 'crear-cita', component: CrearCitaComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'citas-pendientes', component: CitasPendientesComponent },
  { path: 'pagos', component: PagoComponent },
  { path: 'filtrar_pagos', component: PagoFiltrarComponent},
  { path: 'productos', component: ProductoListComponent},
  { path: 'productos/nuevo', component: ProductoFormComponent },
  { path: 'productos/editar/:id', component: ProductoFormComponent },
  { path: 'categorias_productos', component: CategoriaComponent},
  { path: 'ventas', component: VentaComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
