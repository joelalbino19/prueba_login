import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private jsonUrl = 'assets/data/users.json';  // Ruta a tu archivo JSON

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<Users>(this.jsonUrl);
  }
}
