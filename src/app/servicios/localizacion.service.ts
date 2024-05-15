import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LocalizacionService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  verLocalizaciones(): Observable<any> {
    return this.http.post(`${this.baseUrl}/mapa/restaurantes`, {});
  }


}
