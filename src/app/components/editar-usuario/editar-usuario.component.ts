import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../shared/usuario.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  form: FormGroup;
  tiposDeDocumento: string[] = ['dni', 'cne']; // Ejemplo de tipos de documento
  roles: string[] = ['cliente', 'admin', 'barbero']; // Ejemplo de roles

  constructor(
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      tipoDeDocumento: [data.usuario.tipoDeDocumento, Validators.required],
      numeroDeDocumento: [data.usuario.numeroDeDocumento, [Validators.required, Validators.pattern(/^\d+$/)]], // Solo números
      nombre: [data.usuario.nombre, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Solo letras
      apellido: [data.usuario.apellido, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Solo letras
      celular: [data.usuario.celular, [Validators.required, Validators.pattern(/^9\d{8}$/)]], // Comienza con 9 y 9 dígitos
      email: [data.usuario.email, [Validators.required, Validators.email]],
      rol: [data.usuario.rol, Validators.required],
      activo: [data.usuario.activo]
    });

    // Agregar un listener para el tipo de documento
    this.form.get('tipoDeDocumento')?.valueChanges.subscribe(value => {
      this.actualizarValidacionesNumeroDocumento(value);
    });
  }

  private actualizarValidacionesNumeroDocumento(tipo: string): void {
    const numeroDeDocumentoControl = this.form.get('numeroDeDocumento');
    if (tipo === 'dni') {
      numeroDeDocumentoControl?.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]); // Solo 8 dígitos
    } else if (tipo === 'cne') {
      numeroDeDocumentoControl?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(20), Validators.pattern(/^\d+$/)]); // Entre 9 y 20 dígitos
    }
    numeroDeDocumentoControl?.updateValueAndValidity(); // Actualizar validación
  }

  guardar(): void {
    if (this.form.valid) {
      const usuarioEditado = { ...this.data.usuario, ...this.form.value };
      this.dialogRef.close(usuarioEditado);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
