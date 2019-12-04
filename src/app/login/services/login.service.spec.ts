import { TestBed } from '@angular/core/testing';
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

describe('LoginService_Create', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    var store = {};
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
  });

  it('should be created', () => {
    localStorage.setItem('currentUser', JSON.stringify(dummyUserAuthentication));

    const service: LoginService = TestBed.get(LoginService);

    expect(service).toBeTruthy();
    expect(service.currentUser).toBeTruthy();
    expect(service.currentUserValue).toEqual(dummyUserAuthentication);
  });
});


describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.get(LoginService);
    httpMock = TestBed.get(HttpTestingController);

    var store = {};
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });

    spyOn(localStorage, 'removeItem').and.callFake(function (key) {
      return delete store[key]
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('login() should authenticate user', () => {

    service.login("username", "password").subscribe((res) => {
      expect(res).toEqual(dummyUserAuthentication);
    });

    const req = httpMock.expectOne('https://api.brunodev.in/api/login/authenticate');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'username', password: "password" });

    req.flush(dummyUserAuthentication);

    expect(localStorage.getItem('currentUser')).toBe(JSON.stringify(dummyUserAuthentication));
    expect(service.currentUserValue).toEqual(dummyUserAuthentication);
  });

  it('logout() should exit user', () => {

    localStorage.setItem('currentUser', JSON.stringify(dummyUserAuthentication));

    service.login("user1", "password1").subscribe();

    const req = httpMock.expectOne('https://api.brunodev.in/api/login/authenticate');
    req.flush(dummyUserAuthentication);

    service.logout();

    expect(localStorage.getItem('currentUser')).toBeFalsy();
    expect(service.currentUserValue).toBeFalsy();
  });
});