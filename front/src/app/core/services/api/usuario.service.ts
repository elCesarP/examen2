import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../../interfaces/api/usuario.interface";
import { environment } from "src/environments/environment";
import {
  ApiResponse,
  ApiData,
} from "../../interfaces/api/api-response.interface";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private apiUrl: string = `${environment.apiUrl}/usuario`;

  constructor(private _httpClient: HttpClient) {}

  // Crear un nuevo usuario
  public createUsuario(
    usuario: Partial<Usuario>
  ): Observable<ApiResponse<ApiData<Usuario>>> {
    const endpoint = `${this.apiUrl}/post`;
    return this._httpClient.post<ApiResponse<ApiData<Usuario>>>(
      endpoint,
      usuario
    );
  }

  // Obtener todos los usuarios
  public getAllUsuarios(): Observable<Usuario[]> {
    const endpoint = `${this.apiUrl}/get-usuario-all`;
    return this._httpClient.get<Usuario[]>(endpoint);
  }

  // Obtener un usuario por su ID
  public getUsuarioById(id: number): Observable<Usuario> {
    const endpoint = `${this.apiUrl}/get-one/${id}`;
    return this._httpClient.get<Usuario>(endpoint);
  }

  // Actualizar un usuario por su ID
  public updateUsuario(
    id: number,
    usuario: Usuario
  ): Observable<ApiResponse<ApiData<Usuario>>> {
    const endpoint = `${this.apiUrl}/put/${id}`;
    return this._httpClient.put<ApiResponse<ApiData<Usuario>>>(
      endpoint,
      usuario
    );
  }

  // Eliminar un usuario por su ID
  public deleteUsuario(id: number): Observable<ApiResponse<ApiData<null>>> {
    const endpoint = `${this.apiUrl}/delete/${id}`;
    return this._httpClient.delete<ApiResponse<ApiData<null>>>(endpoint);
  }
}
