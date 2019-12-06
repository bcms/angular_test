import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginDialogComponent } from './login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { By } from '@angular/platform-browser';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const dummyUser = <User>{
  id: UUID.UUID(),
  username: "user1",
  password: "password1",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOnRydWUsIlBhaW5lbEIiOmZhbHNlfX0.4Ee96WTCnno0LefvJOwbEOAA0XUNIl2-tSN7MLRu-Lo"
};

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let loginService: LoginService;
  let router: Router;
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [LoginDialogComponent],
      providers: [
        LoginService,
        NgbActiveModal 
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    loginService = TestBed.get(LoginService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.activeModal).toBeTruthy();
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

  it('onSubmit() should validate and authenticate the user', () => {

    let loginService_loginSpy = spyOn(loginService, 'login').and.callThrough();
    let router_navigateSpy = spyOn(router, 'navigate').and.callThrough();
    let loginForm_markAllAsTouchedSpy = spyOn(component.loginForm, 'markAllAsTouched').and.callThrough();
    let lactiveModal_dismissSpy = spyOn(component.activeModal, 'dismiss').and.callThrough();

    let username = component.username
    let password = component.password

    //Usuário e senha vázios
    component.onSubmit();
    expect(loginService_loginSpy).not.toHaveBeenCalled();
    expect(loginForm_markAllAsTouchedSpy).toHaveBeenCalledTimes(1);

    //Usuário e senha inválidos
    username.setValue('usuarioA');
    password.setValue('senha');
    component.onSubmit();
    expect(loginService_loginSpy).not.toHaveBeenCalled();
    expect(loginForm_markAllAsTouchedSpy).toHaveBeenCalledTimes(2);

    //Usuário e senha válidos
    username.setValue('usuarioA');
    password.setValue('Senha12*');
    loginService_loginSpy.and.returnValue(of(dummyUser));
    component.onSubmit();
    expect(loginService_loginSpy).toHaveBeenCalledWith('usuarioA', 'Senha12*');
    expect(router_navigateSpy).toHaveBeenCalledWith(['/home']);
    expect(lactiveModal_dismissSpy).toHaveBeenCalledTimes(1);
    expect(loginForm_markAllAsTouchedSpy).toHaveBeenCalledTimes(2);

    //Usuário não autenticado no serviço
    window.alert = jasmine.createSpy();
    username.setValue('usuarioB');
    password.setValue('Senha44*');
    loginService_loginSpy.and.returnValue(throwError({status: 404}));
    component.onSubmit();
    expect(loginService_loginSpy).toHaveBeenCalledWith('usuarioB', 'Senha44*');
    expect(window.alert).toHaveBeenCalledWith('Usuário ou senha incorretos!');
    expect(loginForm_markAllAsTouchedSpy).toHaveBeenCalledTimes(2);

  });
});
