import { Component, OnInit } from "@angular/core";
import { HabitacionService } from "src/app/core/services/api/habitacion.service";
import { Habitacion } from "src/app/core/interfaces/api/habitacion.interface";

import { AuthService } from "src/app/core/services/api/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-habitacion",
  templateUrl: "./habitacion.component.html",
  styleUrls: ["./habitacion.component.scss"],
})
export class HabitacionComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  habitacionSeleccionada: Habitacion | null = null;

  // Definir un objeto para crear una nueva habitación
  nuevaHabitacion: Habitacion = {
    nombre: "",
    descripcion: "",
    precio: 0,
    numero: 0,
    disponible: false,
  };
  

  constructor(
    private habitacionService: HabitacionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  // Obtener todas las habitaciones
  obtenerHabitaciones(): void {
    this.habitacionService.getAllHabitaciones().subscribe(
      (habitaciones) => (this.habitaciones = habitaciones),
      (error) => console.error(error)
    );
  }

  // Crear o actualizar una habitación
  guardarHabitacion(habitacion: Habitacion): void {
    if (habitacion.id) {
      // Actualizar habitación existente
      this.habitacionService
        .updateHabitacion(habitacion.id, habitacion)
        .subscribe(
          () => this.obtenerHabitaciones(),
          (error) => console.error(error)
        );
    } else {
      // Crear nueva habitación
      this.habitacionService.createHabitacion(habitacion).subscribe(
        () => this.obtenerHabitaciones(),
        (error) => console.error(error)
      );
    }
    this.habitacionSeleccionada = null; // Limpiar el formulario
  }

  // Crear una nueva habitación
  crearHabitacion(): void {
    this.habitacionService.createHabitacion(this.nuevaHabitacion).subscribe(
      () => {
        this.obtenerHabitaciones();
        this.limpiarFormulario(); // Limpiar el formulario después de crear la habitación
      },
      (error) => console.error(error)
    );
  }

  // Limpiar el formulario de creación
  limpiarFormulario(): void {
    this.nuevaHabitacion = {
      nombre: "",
      descripcion: "",
      precio: 0,
      numero: 0,
      disponible: false,
    };
  }

  // Eliminar una habitación
  eliminarHabitacion(id: number): void {
    this.habitacionService.deleteHabitacion(id).subscribe(
      () => this.obtenerHabitaciones(),
      (error) => console.error(error)
    );
  }

  // Seleccionar una habitación para editar
  seleccionarHabitacion(habitacion: Habitacion): void {
    this.habitacionSeleccionada = { ...habitacion };
  }

  // Limpiar la selección
  cancelarEdicion(): void {
    this.habitacionSeleccionada = null;
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.authService.clearToken();
        this.router.navigate(["/login"]);
      },
      (error) => console.error(error)
    );
  }
}
