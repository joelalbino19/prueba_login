import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, Users } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private jsonUrl = 'assets/data/users.json';  // Ruta a tu archivo JSON

  constructor(private http: HttpClient) { }

  getData(): Observable<Users> {
    return this.http.get<Users>(this.jsonUrl);
  }
}
