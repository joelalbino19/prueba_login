import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  serLogin(){

    const url: string = "https://jsonplaceholder.typicode.com/todos/1";
    return this.http.get(url)
  
  }
}
