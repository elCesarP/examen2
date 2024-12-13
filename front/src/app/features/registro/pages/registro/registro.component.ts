import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "src/app/core/services/api/usuario.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent {
  registroForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.maxLength(255)]],
      apellido: ["", [Validators.required, Validators.maxLength(255)]],
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", [Validators.required, Validators.minLength(8)]],
      telefono: ["", [Validators.required, Validators.maxLength(15)]],
      rol_id: ["", [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.usuarioService.createUsuario(this.registroForm.value).subscribe(
        (response) => {
          this.router.navigate(["/login"]); 
        },
        (error) => {
          this.errorMessage =
            "Error al registrar el usuario. Inténtalo de nuevo.";
        }
      );
    }
  }
}
