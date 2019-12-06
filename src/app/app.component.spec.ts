import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'
import { LoginService } from './login/services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from './login/models/user';
import { UUID } from 'angular2-uuid';
import { of } from 'rxjs';
import { Router } from '@angular/router';

const dummyUser = <User>{
  id: UUID.UUID(),
  username: "user1",
  password: "password1",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOnRydWUsIlBhaW5lbEIiOmZhbHNlfX0.4Ee96WTCnno0LefvJOwbEOAA0XUNIl2-tSN7MLRu-Lo"
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        LoginService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('logout() should exit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    const loginService: LoginService = TestBed.get(LoginService);
    const router: Router = TestBed.get(Router);
    
    let loginService_logoutSpy = spyOn(loginService, 'logout').and.callThrough();
    let router_navigateSpy = spyOn(router, 'navigate').and.callThrough();

    app.logout();
    expect(loginService_logoutSpy).toHaveBeenCalled();
    expect(router_navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
