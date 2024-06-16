import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/http.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  typeDocumentList: any[] = [
    { text: 'Cédula de Ciudadania', value: 'C.C' },
    { text: 'Pasaporte', value: 'PS' },
  ];
  documetnNumber: number = 0;
  validFilter: boolean = false;
  constructor(
    private service: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formLogin = this.fb.group({
      'typeDocument': ['', Validators.required],
      'document': ['', [Validators.required, this.lengthValidator]],

    })
  }

  ngOnInit() {
  }
  fnFilterType(){
    if (this.validFilter == true) {
      this.fnGetUserJSON();
      return;
    };
    this.fnGetUser();
  }

  fnGetUser() {
    if (this.formLogin.valid) {
      const formData = this.formLogin.value;

      let paramas = {
        document: this.documetnNumber,
        typeDocument: formData.typeDocument
      }
      this.service.getUserApi(paramas).subscribe(
        data => {
          if (data.status == 200) {

            let users = data.users.filter((userData: any) => userData.document === this.documetnNumber);
            let user;
            for (let i = 0; i < users.length; i++) {
              const element = users[i];
              user = element;
            }
            if (user) {
              localStorage.setItem("view", 'form');
              localStorage.setItem("user", JSON.stringify(user));
              this.toastr.success("Usuario encontrado exitosamente", 'Success!! ');
              this.router.navigate(['/home']);
            }
          }
        },
        resError => {
          if (resError.error.status == 404) {
            this.toastr.warning(resError.error.message, 'Alerta!! ');
          } else {
            this.toastr.error("Revise su conexión o contactese con su administrador", 'Error de conexión');
          }
        }
      );
    } else {
      alert('Debe completar todos los campos del formulario correctamente')
    }
  }

  fnGetUserJSON() {
    this.service.getData().subscribe((response: any) => {

      let users = response.filter((userData: any) => userData.document === this.documetnNumber);
      let user;
      for (let i = 0; i < users.length; i++) {
        const element = users[i];
        user = element;
      }
      if (user) {
        localStorage.setItem("view", 'form');
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(['/home']);
      }
    })
  }

  fnGetUsers() {
    this.service.getUsersApi().subscribe(
      response => {
        if (response.status == 200) {
          localStorage.setItem("users", JSON.stringify(response.user));
          localStorage.setItem("view", 'grid');
          this.toastr.success("Usuarios encontrados exitosamente", 'Success!! ');
          this.router.navigate(['/home']);
        }
      },
      resError => {
        if (resError.error.status == 404) {
          this.toastr.warning(resError.error.message, 'Alerta!! ');
        } else {
          this.toastr.error("Revise su conexión o contactese con su administrador", 'Error de conexión');
        }
      }
    )
  }

  fnValidFilter() {
    this.validFilter = !this.validFilter
  }

  lengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value.replace(/\D/g, '');
    if (value.length < 8 || value.length > 11) {
      return { length: true };
    }
    return null;
  }

  fnFormatNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    this.documetnNumber = parseInt(value);
    if (value.length > 11) {
      value = value.slice(0, 11); // Limitar a 11 dígitos
    }
    input.value = this.addThousandSeparators(value);
    this.formLogin.controls['document'].setValue(input.value);
  }
  addThousandSeparators(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Añadir separadores de miles
  }

}