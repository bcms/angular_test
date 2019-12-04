import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let loginService: LoginService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [ LoginComponent ],
      providers: [
        LoginService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.get(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty form should be invalid', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field validation', () => {
    let errors = {};
    let username = component.username;
    expect(username.valid).toBeFalsy();

    // Campo é obrigatório
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();   

    // Atribuir valor correto para o campo
    username.setValue("usuario123");
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('password field validation', () => {
    let errors = {};
    let password = component.password;
    expect(password.valid).toBeFalsy();

    // Campo é obrigatório
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Atribuir qualquer valor incorreto para o campo
    password.setValue("senha123");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Atribuir valor correto para o campo
    password.setValue("Senha12*");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });


  it('login() should validate and authenticate the user', ()=> {

    const loginService_loginSpy = spyOn(loginService, 'login').and.callThrough();

    let username = component.username
    let password = component.password

    //Usuário e senha vázios
    component.login();
    expect(loginService_loginSpy).not.toHaveBeenCalled()

    //Usuário e senha inválidos
    username.setValue('usuarioA');
    password.setValue('senha');
    component.login();
    expect(loginService_loginSpy).not.toHaveBeenCalled();

    //Usuário e senha válidos
    username.setValue('usuarioA');
    password.setValue('Senha12*');
    component.login();
    expect(loginService_loginSpy).toHaveBeenCalled();
    
  });
});
