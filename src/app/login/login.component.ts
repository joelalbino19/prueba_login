import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/http.service';
import { User, Users } from '../interface/login';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dataUser: User[];
  inputFilter = new FormControl('');
  constructor(private httpService: LoginService) {
    this.dataUser = [];
  }
  ngOnInit(): void {
    this.fnGetDataUser();
  }


  fnGetDataUser() {
    this.httpService.getData().subscribe((response: Users) => {
      if (response.rows.length > 0) {
        let data = response.rows;
        localStorage.setItem('data', JSON.stringify(data))
        this.dataUser = data;
      }
    })
  }

  filterData() {
    this.dataUser.filter((user => {
      if (user.nombre === this.inputFilter.value) {
        let data = user;
        this.dataUser = [data];
      }
      if (user.entidad === this.inputFilter.value) {
        let data = user;
        this.dataUser = [data];
      }
      if (user.email === this.inputFilter.value) {
        let data = user
        this.dataUser = [data];
      }
    }))
  }

  clearFilter() {
    let data = localStorage.getItem('data');
    let dataParser;
    if (data) {
      this.inputFilter.setValue("");
      dataParser = JSON.parse(data);
      this.dataUser = dataParser;
    }
  }

  deleteUser(user: User) {
    let data: any[] = [];
    this.dataUser.filter((userFilter) => {
      if (userFilter.id !== user.id) {
        data.push(userFilter);
      }
    })
    localStorage.setItem('data', JSON.stringify(data))
    this.dataUser = data;
  }
}