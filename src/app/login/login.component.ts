import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private service: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      'identification': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],

    })
  }

  ngOnInit() {
    localStorage.clear();
  }

  fnLogin() {
    if (this.formLogin.valid) {
      this.service.serLogin().subscribe((response: any) => {
        if (response.id != null) {
          this.router.navigate(['/home']);
          localStorage.setItem("title", response.title);
          console.log(response);
        }
      })
    } else {
      alert('Debe completar todos los campos del formulario correctamente')
    }
  }

}