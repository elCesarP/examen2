import { Component, OnInit } from "@angular/core";
import { RolService } from "src/app/core/services/api/rol.service"; 
import { Rol } from "src/app/core/interfaces/api/rol.interface";

@Component({
  selector: "app-rol",
  templateUrl: "./rol.component.html",
  styleUrl: "./rol.component.scss",
})
export class RolComponent implements OnInit {
  roles: Rol[] = [];
  rol: Rol = { nombre_rol: "" }; // Objeto para almacenar el rol nuevo

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.getRoles(); // Obtener lista de roles al iniciar el componente
  }

  // Método para obtener todos los roles
  getRoles(): void {
    this.rolService.getAllRoles().subscribe(
      (response) => {
        console.log("Roles recibidos:", response); // Depuración
        this.roles = response; // Asignar el array directamente
      },
      (error) => {
        console.error("Error al obtener los roles:", error);
      }
    );
  }

  // Método para crear un rol
  onSubmit(): void {
    this.rolService.createRol(this.rol).subscribe(
      (response) => {
        console.log("Rol creado con éxito:", response);
        this.getRoles(); // Actualizar la lista después de crear
      },
      (error) => {
        console.error("Error al crear el rol:", error);
      }
    );
  }

  // Método para actualizar un rol
  onUpdate(id: number, rol: Rol): void {
    if (id && rol) {
      this.rolService.updateRol(id, rol).subscribe(
        (response) => {
          console.log("Rol actualizado con éxito:", response);
          this.getRoles(); // Actualizar la lista después de actualizar
        },
        (error) => {
          console.error("Error al actualizar el rol:", error);
        }
      );
    } else {
      console.error("ID o datos del rol no válidos");
    }
  }

  // Método para eliminar un rol
  onDelete(id: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar este rol?")) {
      this.rolService.deleteRol(id).subscribe(
        (response) => {
          console.log("Rol eliminado con éxito:", response);
          this.getRoles(); // Actualizar la lista después de eliminar
        },
        (error) => {
          console.error("Error al eliminar el rol:", error);
        }
      );
    }
  }
}