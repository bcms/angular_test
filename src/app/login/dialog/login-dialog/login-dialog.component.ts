import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    public activeModal: NgbActiveModal
  ) { }

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

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginService.login(this.username.value, this.password.value)
      .subscribe(
        data => {
          this.activeModal.dismiss();
          this.router.navigate(['/home']);
        },
        error => {
          alert('Usuário ou senha incorretos!');
        });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}

