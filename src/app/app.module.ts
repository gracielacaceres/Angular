import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de que esté importado
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './features/login/login.component';
import { UserDashboardComponent } from './layout/user-dashboard/user-dashboard.component';
import { FormsModule } from '@angular/forms';
import { CrearCitaComponent } from './components/crear-cita/crear-cita.component';
import { AccessDeniedComponent } from './features/access-denied/access-denied.component';
import { CitasPendientesComponent } from './components/citas-pendientes/citas-pendientes.component';
import { PagoComponent } from './components/pago/pago.component';
import { PagoFiltrarComponent } from './components/pago-filtrar/pago-filtrar.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { VentaComponent } from './components/venta/venta.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    EditarUsuarioComponent,
    AddUserComponent,
    DashboardComponent,
    LoginComponent,
    UserDashboardComponent,
    CrearCitaComponent,
    AccessDeniedComponent,
    CitasPendientesComponent,
    PagoComponent,
    PagoFiltrarComponent,
    ProductoListComponent,
    CategoriaComponent,
    ProductoFormComponent,
    VentaComponent,

   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MatSelectModule,
    RouterModule.forRoot([]), // Asegúrate de que tus rutas están configuradas
    AppRoutingModule,
    FormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
