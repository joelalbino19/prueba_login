import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/http.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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

  constructor(
    private service: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      'typeDocument': ['C.C', Validators.required],
      'document': ['', [Validators.required, this.lengthValidator]],

    })
  }

  ngOnInit() {
  }

  fnLogin() {
    if (this.formLogin.valid) {
      this.service.getData().subscribe((response: any) => {

        let users = response.filter((userData: any) => userData.document === this.documetnNumber);
        let user;
        for (let i = 0; i < users.length; i++) {
          const element = users[i];
          user = element;
        }
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.router.navigate(['/home']);
        }
      })
    } else {
      alert('Debe completar todos los campos del formulario correctamente')
    }
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