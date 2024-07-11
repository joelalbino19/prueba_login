import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { User, Users } from '../interface/login';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dataUser: User[];
  formUser: FormGroup;
  texButton: string;
  userForUpdate: User;
  inputFilter = new FormControl('');
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formUser = fb.group({
      "nombre": ['', Validators.required],
      "entidad": ['', Validators.required],
      "email": ['', [Validators.required, Validators.email]],
    })
    this.texButton = "GUARDAR";
    this.userForUpdate = {
      email: "",
      entidad: "",
      id: 0,
      nombre: ""
    }
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
        this.toastr.success("Registros obtenidos exitosamente", 'Success!! ');
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
    this.toastr.success("Registro eliminando exitosamente", 'Success!! ');
  }

  getUpdateUser(user: User) {
    this.userForUpdate = user;
    this.formUser.controls['nombre'].setValue(user.nombre);
    this.formUser.controls['entidad'].setValue(user.entidad);
    this.formUser.controls['email'].setValue(user.email);

    this.texButton = "ACTUALIZAR";
  }

  saveUser() {
    if (this.formUser.invalid) {
      this.toastr.warning("Formulario invalido", 'Warning!! ');
      return;
    }
    let data;
    data = {
      email: this.formUser.controls["email"].value,
      entidad: this.formUser.controls["entidad"].value,
      id: this.dataUser.length + 1,
      nombre: this.formUser.controls["nombre"].value
    };
    this.dataUser.push(data);
    localStorage.setItem('data', JSON.stringify(this.dataUser));
    this.toastr.success("Registro agregado exitosamente", 'Success!! ');
    this.cancel();
  }
  
  updateUser() {
    let data: any[] = [];
    this.dataUser.filter((userFilter) => {
      if (userFilter.id !== this.userForUpdate.id) {
        data.push(userFilter);
      }
      if (userFilter.id === this.userForUpdate.id) {
        if (this.formUser.value) {
          data.push({
            email: this.formUser.controls["email"].value,
            entidad: this.formUser.controls["entidad"].value,
            id: this.userForUpdate.id,
            nombre: this.formUser.controls["nombre"].value
          });
          return;
        }
      }
    })
    localStorage.setItem('data', JSON.stringify(data))
    this.toastr.success("Registro actualizado exitosamente", 'Success!! ');
    this.dataUser = data;
    this.cancel();
  }

  cancel() {
    this.texButton = "GUARDAR";
    this.formUser.controls['nombre'].setValue("");
    this.formUser.controls['entidad'].setValue("");
    this.formUser.controls['email'].setValue("");
  }
}