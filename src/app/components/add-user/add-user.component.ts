import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  form: FormGroup;
  showPassword = false; // Para controlar la visibilidad de la contraseña

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {
    this.form = this.fb.group({
      tipoDeDocumento: ['', Validators.required],
      numeroDeDocumento: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]], // Acepta letras y espacios
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]], // Acepta letras y espacios
      celular: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['cliente'], // Valor por defecto
      activo: [true],
    });

    // Suscribirse a cambios en tipoDeDocumento para validar número de documento
    this.form.get('tipoDeDocumento')?.valueChanges.subscribe(value => {
      this.validarDocumento(value);
    });
  }

  validarDocumento(tipoDeDocumento: string): void {
    const numeroDeDocumentoControl = this.form.get('numeroDeDocumento');

    if (tipoDeDocumento === 'dni') {
      numeroDeDocumentoControl?.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]);
    } else if (tipoDeDocumento === 'cne') {
      numeroDeDocumentoControl?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(20), Validators.pattern(/^\d+$/)]);
    } else {
      numeroDeDocumentoControl?.clearValidators();
    }
    numeroDeDocumentoControl?.updateValueAndValidity(); // Actualizar validación después de cambiar
  }

  guardar(): void {
    if (this.form.valid) {
      const usuario = {
        tipoDeDocumento: this.form.value.tipoDeDocumento,
        numeroDeDocumento: this.form.value.numeroDeDocumento,
        nombre: this.form.value.nombre,
        apellido: this.form.value.apellido,
        celular: this.form.value.celular,
        email: this.form.value.email,
        password: this.form.value.password,
        rol: this.form.value.rol,
        activo: this.form.value.activo ? 1 : 0 // Convertir a número
      };
      console.log(usuario); // Para verificar los datos
      this.dialogRef.close(usuario);
    } else {
      this.mostrarAlerta(); // Mostrar alerta si hay errores
    }
  }

  mostrarAlerta(): void {
    this.snackBar.open('Por favor, corrige los errores en el formulario.', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  cancelar(): void {
    this.dialogRef.close(); // Solo cerrar el modal sin pasar datos
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; // Cambia la visibilidad de la contraseña
  }
}
