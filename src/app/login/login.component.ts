import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) { 
    this.loginForm = this.formBuilder.group({
      'username': this.formBuilder.control('', [
        Validators.required
      ]),
      'password': this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*]).{8,}$')
      ])
    });
  }

  ngOnInit() {
  }

  login() {
    if(this.loginForm.valid && this.loginService.login(this.username.value, this.password.value))
    {
        //Redireciona para Home
    }
    else{
      //Mostra: E-mail ou senha inválidos
    }
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
