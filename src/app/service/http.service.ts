import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private jsonUrl = 'assets/data/users.json';  // Ruta a tu archivo JSON

  constructor(private http: HttpClient) { }

  serLogin(){

    const url: string = "https://jsonplaceholder.typicode.com/todos/1";
    return this.http.get(url)
  
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getUserApi(form:any): Observable<any> {
    let url = environment.api + `userById?document=${form.document}&typeDocument=${form.typeDocument}`
    return this.http.get<any>(url)
  }

  getUsersApi(): Observable<any> {
    let url = environment.api + `users`
    return this.http.get<any>(url)
  }
}
