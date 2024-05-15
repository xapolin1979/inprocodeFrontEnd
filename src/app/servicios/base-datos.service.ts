import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  verRegistros(): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/ver`, {});
  }

  verEventos(): Observable<any> {
    return this.http.post(`${this.baseUrl}/calendario/verloseventos`, {});
  }
  insertarRegistro(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/insertar`, datos);
  }

  insertarEventos(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/calendario/evento`, datos);
  }
  actualizarRegistro(id: number, datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/actualizar/${id}`, datos);
  }

  actualizarEvento(id: number, datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/calendario/actualizareventos/${id}`, datos);
  }

  eliminarRegistro(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/eliminar/${id}`, {});
  }
  eliminarEvento(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/calendario/eliminareventos/${id}`, {});
  }
  obtenerRegistroPorId(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/ver/${id}`);
  }


}
