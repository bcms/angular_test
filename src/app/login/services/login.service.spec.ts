import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { User } from '../models/user';
import { UUID } from 'angular2-uuid';

const dummyUserAuthentication = <User>{
  id: UUID.UUID(),
  username: "user1",
  password: "password1",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOnRydWUsIlBhaW5lbEIiOmZhbHNlfX0.4Ee96WTCnno0LefvJOwbEOAA0XUNIl2-tSN7MLRu-Lo"
};

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let injector: TestBed;
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    injector = getTestBed();
    service = injector.get(LoginService);
    httpMock = injector.get(HttpTestingController);

    var store = {};
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      console.log('bla');
      console.log(localStorage);
      return store[key];
    });
  });

  afterEach(() => {
    httpMock.verify();
  });  

  it('should be created', () => {
    localStorage.setItem('currentUser', JSON.stringify(dummyUserAuthentication));
    console.log(JSON.stringify(dummyUserAuthentication));
    console.log(dummyUserAuthentication);
    console.log(dummyUserAuthentication);
    const service: LoginService = TestBed.get(LoginService);

    console.log(service.currentUserValue);
    console.log(service.currentUserValue);

    expect(service).toBeTruthy();
    expect(service.currentUser).toBeTruthy();
    expect(service.currentUserValue).toEqual(dummyUserAuthentication);
  });

  // it('login() should authenticate user', () => {

  //   service.login("username", "password").subscribe((res) => {
  //     // Note that we are expecting "transformed" response with "university" property
  //     expect(res).toEqual(dummyUserAuthentication); 
  //   });

  //   const req = httpMock.expectOne('https://api.brunodev.in/api/login/authenticate');
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual({ username: 'username', password: "password" });

  //   req.flush(dummyUserAuthentication); 

  //   expect(localStorage.getItem('currentUser')).toBe(JSON.stringify(dummyUserAuthentication));
  // });
});
