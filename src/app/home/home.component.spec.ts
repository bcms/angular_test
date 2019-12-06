import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { HomeComponent } from './home.component';
import { LoginService } from '../login/services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../login/models/user';
import { UUID } from 'angular2-uuid';

const dummyUserPanelA = <User>{
  id: UUID.UUID(),
  username: 'user1',
  password: 'Password1*',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOnRydWUsIlBhaW5lbEIiOmZhbHNlfX0.4Ee96WTCnno0LefvJOwbEOAA0XUNIl2-tSN7MLRu-Lo'
};

const dummyUserPanelB = <User>{
  id: UUID.UUID(),
  username: 'user2',
  password: 'Password2*',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOmZhbHNlLCJQYWluZWxCIjp0cnVlfX0.6gJ1vvgtlQIpK_WQUvxc5WyLVUArprNABFNFlQt5flI'
};

const dummyUserBothPanels = <User>{
  id: UUID.UUID(),
  username: 'user3',
  password: 'Password3*',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOnRydWUsIlBhaW5lbEIiOnRydWV9fQ.6h9X9wXOI6y8rjm5bSDuK6JDG4Z26edM97LYH4nDpvo'
};

const dummyUserNoPanels = <User>{
  id: UUID.UUID(),
  username: 'user4',
  password: 'Password4*',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjp7IlBhaW5lbEEiOmZhbHNlLCJQYWluZWxCIjpmYWxzZX19.jxHEf6DXkfOwcWL6mTnzd9lMy7QZLNvg8p_7gJ-BJqM'
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let loginService: LoginService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [HomeComponent],
      providers: [LoginService]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    loginService = TestBed.get(LoginService);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should show/hide panels', () => {
    let loginService_currentUserValueSpy = spyOnProperty(loginService, 'currentUserValue').and.returnValue(dummyUserPanelA);
    
    //Painel A
    component.ngOnInit();
    expect(loginService_currentUserValueSpy).toHaveBeenCalled();
    expect(component.panelA).toBeTruthy();
    expect(component.panelB).toBeFalsy();

    //Painel B
    loginService_currentUserValueSpy.and.returnValue(dummyUserPanelB);

    component.ngOnInit();
    expect(loginService_currentUserValueSpy).toHaveBeenCalled();
    expect(component.panelA).toBeFalsy();
    expect(component.panelB).toBeTruthy();

    //Painel A e B
    loginService_currentUserValueSpy.and.returnValue(dummyUserBothPanels);

    component.ngOnInit();
    expect(loginService_currentUserValueSpy).toHaveBeenCalled();
    expect(component.panelA).toBeTruthy();
    expect(component.panelB).toBeTruthy();

    //Nenhum painel
    loginService_currentUserValueSpy.and.returnValue(dummyUserNoPanels);

    component.ngOnInit();
    expect(loginService_currentUserValueSpy).toHaveBeenCalled();
    expect(component.panelA).toBeFalsy();
    expect(component.panelB).toBeFalsy();

  });
});
