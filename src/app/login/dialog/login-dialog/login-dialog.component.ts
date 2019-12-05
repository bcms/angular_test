import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    
  }

  ngOnInit() {
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

  onSubmit() {

    if (!this.loginForm.valid)
      return;

    this.loginService.login(this.username.value, this.password.value)
      .subscribe(
        data => {
          this.router.navigateByUrl('/');
        }, 
        error => {
          alert('Usuário ou senha incorretos!');
        });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}

